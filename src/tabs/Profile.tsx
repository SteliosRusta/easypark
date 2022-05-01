import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1>Profile</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Profile</h1>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
