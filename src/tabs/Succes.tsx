import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonAvatar,
  InputCustomEvent,
  IonCard,
  IonCardContent,
  IonCardTitle,
} from "@ionic/react";
import "./Profile.css";
import { useHistory } from "react-router-dom";

const Success: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-padding ion-text-center">
          <IonTitle color="danger">Payment!!!</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonCard className="ion-padding ion-text-center ion-justify-content-center">
        <IonCardHeader>
          <IonCardTitle color="primary">
            Your transaction was successful!!! Thank you for you trust!!!
          </IonCardTitle>
        </IonCardHeader>
        <IonButton
          color="primary "
          onClick={() => {
            history.replace("/home", { replace: true });
          }}
        >
          HomePage
        </IonButton>

        <IonButton
          color="primary "
          onClick={() => {
            history.replace("/home/mybookings", { replace: true });
          }}
        >
          My Bookings
        </IonButton>
      </IonCard>

      <IonContent className="ion-padding ion-text-center"></IonContent>
    </IonPage>
  );
};

export default Success;
