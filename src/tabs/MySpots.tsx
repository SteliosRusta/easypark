import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonModal,
  IonList,
  IonInput,
  useIonPicker,
  IonChip,
  IonItemDivider,
} from "@ionic/react";
import { pin, closeCircle } from "ionicons/icons";
import { useAuth } from "../components/context/AuthContex";
import axios from "axios";
import { LatLng, LatLngTuple } from "leaflet";

interface Spot {
  position: {
    address: string;
    location: {
      coordinates: L.LatLngExpression;
      type?: string;
    };
  };
  _id: string;
  __v?: number;
  owner: {
    email: string;
    name: string;
    id: string;
    __v?: number;
  };
  price: number;
  time: {
    avDay: string[];
    avEnd: string;
    avStart: string;
  };
}
const MySpots: React.FC = () => {
  const [text, setText] = useState<string>();
  const [to, setTo] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [present] = useIonPicker();
  const [value, setValue] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [spotPoint, setSpotPoint] = useState<string>("");
  const [spotCoor, setSpotCoor] = useState<LatLngTuple>([0, 0]);
  const [mySpots, setMySpots] = useState<Spot[]>();

  useEffect(() => {
    try {
      (async () => {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_EASYPARK_API_URL}/spots/myspots`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(data);
        setMySpots(data);
        setLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const authContext = useAuth();

  if (!authContext) return null;

  const { setLoading, token, user } = authContext;
  console.log(spotCoor);
  const saveSpot = async () => {
    try {
      setLoading(true);
      setSpotPoint(`${address} ${city} ${zipCode} ${state}`);
      const NOMINATIM_BASE_URL = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${spotPoint}&format=json&limit=1`;

      const requestOption: any = {
        method: "GET",
        redirect: "follow",
      };
      fetch(`${NOMINATIM_BASE_URL}`, requestOption)
        .then((res) => res.text())
        .then((result) => {
          console.log(JSON.parse(result));
          let myVar = JSON.parse(result);
          setSpotCoor([Number(myVar[0].lat), Number(myVar[0].lon)]);
        })
        .catch((err) => console.log(err));

      const formData = {
        position: {
          address: spotPoint,
          location: {
            type: "Point",
            coordinates: spotCoor,
          },
        },
        price: Number(text),

        time: {
          avDay: selectedDays,
          avStart: from,
          avEnd: to,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_EASYPARK_API_URL}/spots`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(selectedDays);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Parking Spots</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonButton expand="full" size="large" color="primary" id="create-spot">
          Add Spot
        </IonButton>
        <IonModal canDismiss={true} trigger="create-spot">
          <IonContent>
            <IonList>
              <IonItemDivider>Location</IonItemDivider>
              <IonItem>
                <IonLabel position="stacked">Address</IonLabel>
                <IonInput
                  onIonChange={(e) => {
                    setAddress(e.detail.value!);
                  }}
                  placeholder="Address Line 1"
                ></IonInput>
                <IonInput placeholder="Address Line 2"></IonInput>
                <IonInput
                  onIonChange={(e) => {
                    setCity(e.detail.value!);
                  }}
                  placeholder="City"
                ></IonInput>
                <IonInput
                  onIonChange={(e) => {
                    setState(e.detail.value!);
                  }}
                  placeholder="State"
                ></IonInput>
                <IonInput
                  onIonChange={(e) => {
                    setZipCode(e.detail.value!);
                  }}
                  placeholder="Zip Code"
                ></IonInput>
              </IonItem>
              <IonItemDivider>Cost</IonItemDivider>
              <IonItem>
                <IonLabel position="floating">Price per hour in Euro</IonLabel>
                <IonInput
                  value={text}
                  onIonChange={(e) => setText(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItemDivider>Availability</IonItemDivider>
              <IonButton
                size="default"
                fill="outline"
                color="Light"
                onClick={() =>
                  present({
                    buttons: [
                      {
                        text: "Confirm",
                        handler: (selected) => {
                          setValue(selected.days.value);
                          setSelectedDays((prev) => [
                            ...new Set([...prev, selected.days.value]),
                          ]);
                        },
                      },
                    ],
                    columns: [
                      {
                        name: "days",
                        options: [
                          { text: "Monday", value: "Monday" },
                          { text: "Tuesday", value: "Tuesday" },
                          { text: "Wednesday", value: "Wednesday" },
                          { text: "Thursday", value: "Thursday" },
                          { text: "Friday", value: "Friday" },
                          { text: "Saturday", value: "Saturday" },
                          { text: "Sunday", value: "Sunday" },
                        ],
                      },
                    ],
                  })
                }
              >
                Choose available days{" "}
              </IonButton>
              <br></br>
              {value && selectedDays
                ? selectedDays.map((day) => {
                    return (
                      <IonChip key={day}>
                        <IonLabel>{day}</IonLabel>
                        <IonIcon
                          icon={closeCircle}
                          onClick={() =>
                            setSelectedDays((prev) =>
                              prev.filter((el) => el !== day)
                            )
                          }
                        />
                      </IonChip>
                    );
                  })
                : null}
              <br></br>
              <IonButton
                size="default"
                fill="outline"
                color="Light"
                onClick={() =>
                  present(
                    [
                      {
                        name: "hour",
                        options: [
                          { text: "1", value: "1" },
                          { text: "2", value: "2" },
                          { text: "3", value: "3" },
                          { text: "4", value: "4" },
                          { text: "5", value: "5" },
                          { text: "6", value: "6" },
                          { text: "7", value: "7" },
                          { text: "8", value: "8" },
                          { text: "9", value: "9" },
                          { text: "10", value: "10" },
                          { text: "11", value: "11" },
                          { text: "12", value: "12" },
                        ],
                      },
                      {
                        name: "time",
                        options: [
                          { text: "AM", value: "AM" },
                          { text: "PM", value: "PM" },
                        ],
                      },
                    ],
                    [
                      {
                        text: "Confirm",
                        handler: (selected) => {
                          setFrom(
                            `${selected.hour.value} ${selected.time.value}`
                          );
                        },
                      },
                    ]
                  )
                }
              >
                {" "}
                From :
              </IonButton>
              {from && <div>Available from: {from}</div>}
              <br></br>
              <IonButton
                size="default"
                fill="outline"
                color="Light"
                onClick={() =>
                  present(
                    [
                      {
                        name: "hour",
                        options: [
                          { text: "1", value: "1" },
                          { text: "2", value: "2" },
                          { text: "3", value: "3" },
                          { text: "4", value: "4" },
                          { text: "5", value: "5" },
                          { text: "6", value: "6" },
                          { text: "7", value: "7" },
                          { text: "8", value: "8" },
                          { text: "9", value: "9" },
                          { text: "10", value: "10" },
                          { text: "11", value: "11" },
                          { text: "12", value: "12" },
                        ],
                      },
                      {
                        name: "time",
                        options: [
                          { text: "AM", value: "AM" },
                          { text: "PM", value: "PM" },
                        ],
                      },
                    ],
                    [
                      {
                        text: "Confirm",
                        handler: (selected) => {
                          setTo(
                            `${selected.hour.value} ${selected.time.value}`
                          );
                        },
                      },
                    ]
                  )
                }
              >
                {" "}
                To :
              </IonButton>
              {to && <div>Available up to: {to}</div>}
            </IonList>
            <IonButton onClick={saveSpot} expand="full" color="primary">
              Save Spot
            </IonButton>
          </IonContent>
        </IonModal>
        {mySpots &&
          mySpots.map((spot) => {
            return (
              <IonCard key={spot._id}>
                <IonItem>
                  <IonIcon icon={pin} slot="start" />
                  <IonLabel>{spot.owner.name}'s Parking lot</IonLabel>
                  <IonButton
                    onClick={() => {
                      axios.delete(
                        `${process.env.REACT_APP_EASYPARK_API_URL}/spots/${spot._id}`,
                        {
                          headers: {
                            Authorization: token,
                          },
                        }
                      );
                      setMySpots((prev) =>
                        prev?.filter((item) => item._id !== spot._id)
                      );
                    }}
                    color="danger"
                    fill="solid"
                    slot="end"
                  >
                    Delete
                  </IonButton>
                </IonItem>

                <IonCardContent>
                  Address: {spot.position.address}
                  <br></br>
                  Available days : {spot.time.avDay.toString().split("")}
                  <br></br>
                  From : {spot.time.avStart} To : {spot.time.avEnd}
                  <br></br>
                  Price : {spot.price} €
                </IonCardContent>
              </IonCard>
            );
          })}
      </IonContent>
    </IonPage>
  );
};

export default MySpots;
