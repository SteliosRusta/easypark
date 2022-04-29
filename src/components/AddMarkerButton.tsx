import useAddMarker from "./customHooks/useAddMarker";

interface Props {}

const AddMarkerButton: React.FC<Props> = (props) => {
  const { setActivate, activate } = useAddMarker(false);

  return <button onClick={() => setActivate(!activate)}>Add Points</button>;
};

export default AddMarkerButton;
