import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import { LayerContext } from "./context/LayerContext";

import { SearchBar } from "./SearchBar";
import { IonLoading, IonToast } from "@ionic/react";

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

  const [loading, setLoading] = useState<boolean>(false);

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
