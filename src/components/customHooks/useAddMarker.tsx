import { useContext, useEffect, useState, useCallback } from "react";
import { useMap, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { LayerContext } from "../context/LayerContext";

// the hook Effect will be activated by the click on the button

function useAddMarker(selected: boolean) {
  const map = useMap();
  const { setPoint } = useContext(LayerContext);

  // add a state to activate the Event
  const [activate, setActivate] = useState(selected);

  // define the MouseEvent with the useCallback hook
  const markerEvent = useCallback(
    (e: LeafletMouseEvent) => {
      e.originalEvent.preventDefault();
      setPoint(<Marker position={e.latlng} />);
      e.originalEvent.stopPropagation();
    },
    [setPoint]
  );

  // activate the EventHandler with the useEffect handler
  useEffect(() => {
    map?.doubleClickZoom.disable();
    if (activate === true) {
      map?.on("dblclick", markerEvent);
    }
    return () => {
      map?.off("dblclick", markerEvent);
    };
  }, [map, activate, markerEvent]);

  return { activate, setActivate };
}

export default useAddMarker;
