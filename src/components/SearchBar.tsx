import React, { useState, useContext } from "react";
import { LayerContext } from "./context/LayerContext";
import { IonSearchbar, IonButton, IonIcon } from "@ionic/react";
import { search } from "ionicons/icons";
import { LatLngTuple } from "leaflet";

// interface Options {
//   method: string;
//   redirect: string;
// }

export const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const defaultValue = useContext<LatLngTuple | any>(LayerContext);
  const [point, setPoint] = defaultValue;

  const handleSearch = () => {
    const NOMINATIM_BASE_URL = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${searchText}&format=json&limit=1`;

    const requestOption: any = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_BASE_URL}`, requestOption)
      .then((res) => res.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setPoint(JSON.parse(result));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      id="searchcontainer"
      className="container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div id="searchbar" style={{ display: "flex", alignItems: "start" }}>
        <IonSearchbar
          debounce={100}
          style={{ padding: 0, margin: 0 }}
          value={searchText}
          onIonChange={(e) => {
            setSearchText(e.detail.value!);
          }}
        ></IonSearchbar>
        <IonButton
          style={{ padding: 0, margin: 0, height: "76%" }}
          onClick={handleSearch}
        >
          <IonIcon slot="end" icon={search} />
        </IonButton>
      </div>
    </div>
  );
};
