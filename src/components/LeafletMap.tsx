import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngExpression, LatLngLiteral, LatLngTuple } from "leaflet";
import { LayerContext } from "./context/LayerContext";
import { isSaturday, isSunday } from "date-fns";
import { Geolocation, Position } from "@capacitor/geolocation";

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
  IonToast,
} from "@ionic/react";
import { carOutline, pin } from "ionicons/icons";
import { useAuth } from "./context/AuthContex";
import axios from "axios";
import TimeValidationTimePicker from "./TimePicker";
import MobiScrol from "./MobiScrol";
import { useLocation } from "react-router";

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
    booked?: { startDate: string; endDate: string }[];
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
  const [open, setOpen] = useState(false);
  const [spot, setSpot] = useState<Spot>();
  console.log(point, selectedLocation);
  const [userLocation, setUserLocation] = useState<LatLngExpression>([
    52.4511, 13.5424,
  ]);
  const [nearbySpots, setNearbySpots] = useState<Spot[]>();
  const [value, setValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>(Date());

  console.log(value);

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
      const getCurrentPosition = async () => {
        try {
          const position = await Geolocation.getCurrentPosition();
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          console.log(position);
          setError({ message: undefined, showError: false });

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
      };
      getCurrentPosition();
    }
  }, []);

  const createBooking = async () => {
    try {
      setLoading(true);
      const startD = new Date(selectedDate);
      console.log(startD);
      new Date(startD.setHours(startD.getHours() + value)).toISOString();
      const formData = {
        start: new Date(selectedDate).toISOString(),
        end: new Date(
          startD.setHours(new Date(selectedDate).getHours() + value)
        ).toISOString(),
        spot: spot?._id,
      };
      console.log(formData);
      const { data } = await axios.post(
        `${process.env.REACT_APP_EASYPARK_API_URL}/booking`,
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
  const authContext = useAuth();

  if (!authContext) return null;

  const { loading, setLoading, isAuthenticated, user, token } = authContext;

  if (loading)
    return <IonLoading isOpen={loading} message={"Please wait..."} />;
  return (
    <>
      <IonModal
        isOpen={open}
        breakpoints={[0.1, 0.8, 1]}
        initialBreakpoint={0.8}
        onDidDismiss={() => {
          setOpen(false);
        }}
      >
        <IonContent>
          {/* <IonDatetime
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
          ></IonDatetime> */}
          {/* <TimeValidationTimePicker spot={spot} booked={spot?.time.booked} /> */}
          <MobiScrol
            booked={spot?.time.booked}
            setSelectedDate={setSelectedDate}
            avDays={spot?.time.avDay}
          />

          {from && <div>Available from: {from}</div>}
          <IonItemDivider>For how many hours?</IonItemDivider>
          <IonItem>
            <IonRange
              min={1}
              max={8}
              step={1}
              pin={true}
              value={value}
              onIonChange={(e) => setValue(e.detail.value as number)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              {value > 1 ? "hours" : "hour"}: {value}
            </IonLabel>
          </IonItem>
          <IonButton
            onClick={createBooking}
            expand="block"
            id="stripe"
            href="/pay"
          >
            Proceed with Payment
          </IonButton>
          {/*   <IonModal trigger="stripe">
                          <Stripe />
                        </IonModal> */}
        </IonContent>
      </IonModal>
      <MapContainer
        id="map"
        center={userLocation}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "87vh", width: "100vw" }}
      >
        <SearchBar />
        <IonToast
          isOpen={error.showError}
          message={error.message}
          duration={3000}
          onDidDismiss={() => {
            setError({ message: undefined, showError: false });
          }}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=3h7MREADTYdMOXr8hNkM "
        />
        {point && (
          <Marker position={userLocation} icon={icon}>
            <Popup>This is your Location.</Popup>
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
                    <IonButton
                      onClick={() => {
                        setOpen(true);
                        setSpot(spot);
                      }}
                    >
                      Book Now
                    </IonButton>
                  </Popup>
                </Marker>
              );
            })
          : null}
        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          style={{ marginBottom: 15 }}
        >
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
        <IonFab
          vertical="bottom"
          horizontal="start"
          slot="fixed"
          style={{ marginBottom: 15 }}
        >
          <IonFabButton onClick={() => {}}>
            <IonIcon icon={pin} />
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
