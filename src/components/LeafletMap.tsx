import React, { useContext, useEffect } from "react";
import {
  LayerGroup,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L, { LatLng, LatLngTuple } from "leaflet";
import { LayerContext } from "./context/LayerContext";

import AddMarkerButton from "./AddMarkerButton";
import { SearchBar } from "./SearchBar";

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom: number = 8;
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

const LeafletMap: React.FC = () => {
  const defaultValue = useContext<any>(LayerContext);
  const [point, setPoint] = defaultValue;
  const selectedLocation: LatLngTuple = [point[0].lat, point[0].lon];
  console.log(point, selectedLocation);

  return (
    <>
      {/* <MapContainer id="map" center={defaultLatLng} zoom={zoom}>
        <AddMarkerButton />
        <LayerGroup>{point}</LayerGroup>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>
      </MapContainer> */}
      <MapContainer
        id="map"
        center={[51.505, -0.09]}
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
          <Marker position={[51.505, -0.09]} icon={icon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
        <ResetCenterView
          selectedLocation={
            selectedLocation ? selectedLocation : [51.505, -0.09]
          }
        />
      </MapContainer>
    </>
  );
};

export default LeafletMap;
