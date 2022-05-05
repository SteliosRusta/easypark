import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import { LayerContext } from "./context/LayerContext";
import { isSaturday, isSunday } from "date-fns";

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
} from "@ionic/react";
import { carOutline } from "ionicons/icons";
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

  console.log(point, selectedLocation);

  const [userLocation, setUserLocation] = useState<L.LatLngExpression>([
    52, 13,
  ]);
  const [nearbySpots, setNearbySpots] = useState<Spot[]>();
  const [latitude, setLatitude] = useState<number>();

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
    return (
      <IonLoading
        isOpen={loading}
        onDidDismiss={() => console.log("dialog is closed")}
        message={"Please wait..."}
      />
    );
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
                    {/* <IonModal
                      isOpen={true}
                      breakpoints={[0.1, 0.5, 1]}
                      initialBreakpoint={0.5}
                    >
                      <IonContent>Modal Content</IonContent>
                    </IonModal> */}
                    <IonButton id="trigger-button">Book Now</IonButton>
                    <IonModal
                      trigger="trigger-button"
                      breakpoints={[0.1, 0.5, 1]}
                      initialBreakpoint={0.5}
                    >
                      <IonContent>
                        <IonDatetime
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
                        <IonButton>Proceed</IonButton>
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
