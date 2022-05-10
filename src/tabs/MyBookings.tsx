import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLoading,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { pin } from "ionicons/icons";
import { useAuth } from "../components/context/AuthContex";
import axios from "axios";
import TimeValidationTimePicker from "../components/TimePicker";
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
    email?: string;
    name?: string;
    id?: string;
    __v?: number;
  };
  price: number;
  time: {
    avDay: string[];
    avEnd: string;
    avStart: string;
    booked: [
      { startDate: string; endDate: string; idBooking: string; _id: string }
    ];
  };
}
interface Booking {
  endDate: string;
  startDate: string;
  _id: string;
  __v?: number;
  user: {
    email: string;
    name: string;
    _id: string;
    __v?: number;
  };
  spot: Spot;
}
const MyBookings: React.FC = () => {
  const [myBookings, setMyBookings] = useState<Booking[]>();
  useEffect(() => {
    try {
      (async () => {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_EASYPARK_API_URL}/booking`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setLoading(false);
        console.log(data);
        setMyBookings(data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const authContext = useAuth();

  if (!authContext) return null;

  const { setLoading, token } = authContext;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Bookings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TimeValidationTimePicker booked />
        {myBookings &&
          myBookings.map((booking) => {
            return (
              <IonCard key={booking._id}>
                <IonItem>
                  <IonIcon icon={pin} slot="start" />
                  <IonLabel>Booked Parking lot</IonLabel>
                  <IonButton
                    onClick={() => {
                      axios.delete(
                        `${process.env.REACT_APP_EASYPARK_API_URL}/booking/${booking._id}`,
                        {
                          headers: {
                            Authorization: token,
                          },
                        }
                      );
                      setMyBookings((prev) =>
                        prev?.filter((item) => item._id !== booking._id)
                      );
                    }}
                    color="danger"
                    fill="solid"
                    slot="end"
                  >
                    Cancel
                  </IonButton>
                </IonItem>

                <IonCardContent>
                  Address: {booking.spot.position.address}
                  <br></br>
                  Booked for : {new Date(booking.startDate).toDateString()}
                  <br></br>
                  From : {booking.spot.time.avStart} To :{" "}
                  {booking.spot.time.avEnd}
                  <br></br>
                  Price : {booking.spot.price} €/hour
                </IonCardContent>
              </IonCard>
            );
          })}
      </IonContent>
    </IonPage>
  );
};

export default MyBookings;
