import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

const MySpots: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1>My Spots</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>My spots</h1>
      </IonContent>
    </IonPage>
  );
};

export default MySpots;
