import React, { useContext } from "react";
import { LayerGroup, MapContainer, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { LayerContext } from "./context/LayerContext";
import AddMarkerButton from "./AddMarkerButton";

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom: number = 8;

const LeafletMap: React.FC = () => {
  const { point } = useContext(LayerContext);
  return (
    <>
      <MapContainer id="map" center={defaultLatLng} zoom={zoom}>
        <AddMarkerButton />
        <LayerGroup>{point}</LayerGroup>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>
      </MapContainer>
    </>
  );
};

export default LeafletMap;
