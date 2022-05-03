import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLoading,
} from "@ionic/react";
import "./HomePage.css";
import LeafletMap from "../components/LeafletMap";
import { LayerContextProvider } from "../components/context/LayerContext";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1>Home</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading
          isOpen={true}
          onDidDismiss={() => console.log("dialog is closed")}
          message={"Please wait..."}
          duration={3000}
        />
        <LayerContextProvider>
          <LeafletMap />
        </LayerContextProvider>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
