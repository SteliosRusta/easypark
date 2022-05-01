import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

const MyBookings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1>My Bookings</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>My Bookings</h1>
      </IonContent>
    </IonPage>
  );
};

export default MyBookings;
