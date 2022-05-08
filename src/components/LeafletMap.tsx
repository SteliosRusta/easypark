import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import { LayerContext } from "./context/LayerContext";
import { isSaturday, isSunday } from "date-fns";
import Stripe from "./Stripe";

import { SearchBar } from "./SearchBar";
import {
  IonLoading,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonContent,
  IonDatetime,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonRange,
  useIonPicker,
} from "@ionic/react";
import { carOutline, contractOutline } from "ionicons/icons";
import { useAuth } from "./context/AuthContex";
import axios from "axios";

const icon = L.icon({
  iconUrl: "./location-sharp.svg",
  iconSize: [38, 38],
});

const ResetCenterView = (props: any) => {
  const { selectedLocation } = props;
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.setView(L.latLng(selectedLocation), map.getZoom(), {
        animate: true,
      });
    }
  }, [selectedLocation]);

  return null;
};
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
interface LocationError {
  showError: boolean;
  message?: string;
}

const LeafletMap: React.FC = () => {
  const defaultValue = useContext<any>(LayerContext);
  const [point, setPoint] = defaultValue;
  const selectedLocation: LatLngTuple = [point[0]?.lat, point[0]?.lon];
  const [error, setError] = useState<LocationError>({ showError: false });
  const [present] = useIonPicker();
  const [from, setFrom] = useState("");
  console.log(point, selectedLocation);
  const [userLocation, setUserLocation] = useState<L.LatLngExpression>([
    52, 13,
  ]);
  const [nearbySpots, setNearbySpots] = useState<Spot[]>();
  const [value, setValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState("2012-12-15T13:47:20.789");

  useEffect(() => {
    setLoading(true);
    if ("geolocation" in navigator) {
      const getAprox = async () => {
        const res = await fetch(
          "https://geo.ipify.org/api/v2/country?apiKey=at_FUthQZPmn3FCAIXECCETY9B8apR6B"
        );
        const data = await res.json();
        console.log(data);
      };
      navigator.geolocation.getCurrentPosition(async (geolocation) => {
        try {
          setUserLocation([
            geolocation.coords.latitude,
            geolocation.coords.longitude,
          ]);
          setLoading(false);
        } catch (e: any) {
          const message =
            e.message.length > 0
              ? e.message
              : "Cannot get user Location. Check Permissions";
          setError({ showError: true, message });
          setLoading(false);
          getAprox();
        }
      });
    }
  }, []);
  const authContext = useAuth();

  if (!authContext) return null;

  const { loading, setLoading, isAuthenticated, user, token } = authContext;

  if (loading)
    return <IonLoading isOpen={loading} message={"Please wait..."} />;
  return (
    <>
      <MapContainer
        id="map"
        center={userLocation}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "87vh", width: "100vw" }}
      >
        <SearchBar />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=3h7MREADTYdMOXr8hNkM "
        />
        {point && (
          <Marker position={userLocation} icon={icon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
        {nearbySpots
          ? nearbySpots.map((spot: Spot) => {
              return (
                <Marker
                  key={spot._id}
                  position={spot.position.location.coordinates}
                  icon={icon}
                >
                  <Popup>
                    <h3 color="blue">{spot.price}€/Hour</h3>
                    <p>{spot.position.address}</p>
                    <IonButton id="trigger-button">Book Now</IonButton>
                    <IonModal
                      trigger="trigger-button"
                      breakpoints={[0.1, 0.7, 1]}
                      initialBreakpoint={0.7}
                    >
                      <IonContent>
                        <IonDatetime
                          value={selectedDate}
                          onIonChange={(e) => {
                            setSelectedDate(e.detail.value!);
                          }}
                          size="cover"
                          firstDayOfWeek={1}
                          minuteValues="0,30"
                          isDateEnabled={(dateIsoString: string) => {
                            if (
                              isSaturday(new Date(dateIsoString)) ||
                              isSunday(new Date(dateIsoString))
                            ) {
                              // Disables Saturday and Sunday
                              return false;
                            }
                            return true;
                          }}
                        ></IonDatetime>
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
                                    console.log(selected);
                                    setFrom(
                                      `${selected.hour.value} ${selected.time.value}`
                                    );
                                  },
                                },
                              ]
                            )
                          }
                        >
                          From :
                        </IonButton>
                        {from && <div>Available from: {from}</div>}
                        <IonItemDivider>For how many hours?</IonItemDivider>
                        <IonItem>
                          <IonRange
                            min={1}
                            max={8}
                            step={1}
                            pin={true}
                            value={value}
                            onIonChange={(e) =>
                              setValue(e.detail.value as number)
                            }
                          />
                        </IonItem>
                        <IonItem>
                          <IonLabel>
                            {value > 1 ? "hours" : "hour"}: {value}
                          </IonLabel>
                        </IonItem>
                        <IonButton expand="block" id="stripe">
                          Proceed with Payment
                        </IonButton>
                        <IonModal trigger="stripe">
                          <Stripe />
                        </IonModal>
                      </IonContent>
                    </IonModal>
                  </Popup>
                </Marker>
              );
            })
          : null}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={async () => {
              setLoading(true);
              const { data } = await axios.get(
                `${process.env.REACT_APP_EASYPARK_API_URL}/spots/?lng=${
                  selectedLocation[1] || "13.5424887"
                }&lat=${selectedLocation[0] || "52.4511287"}&radius=5`,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              setNearbySpots(data);
              setLoading(false);
              console.log(nearbySpots);
            }}
          >
            <IonIcon icon={carOutline} />
          </IonFabButton>
        </IonFab>

        <ResetCenterView
          selectedLocation={
            selectedLocation[0] === undefined ? userLocation : selectedLocation
          }
        />
      </MapContainer>
    </>
  );
};

export default LeafletMap;
