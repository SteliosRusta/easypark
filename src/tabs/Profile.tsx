import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonFabButton,
  IonFab,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonButton,
  IonInput,
  IonAvatar,
  InputCustomEvent,
} from "@ionic/react";
import { pin, wifi, wine, warning, walk } from "ionicons/icons";
import "./Profile.css";
import { useState } from "react";

interface UserData {
  name: string;
  email: string;
  password: string;
  taxId?: string;
}

export const Profile: React.FC = () => {
  const [{ name, email, password, taxId }, setFormState] = useState<UserData>({
    name: "Nemanja Popovic",
    email: "n.popovic94@gmail.com",
    password: "123123",
  });

  const onInputChange = (event: Event) => {
    const inputEvent = event as InputCustomEvent;

    setFormState((prev) => ({
      ...prev,
      [inputEvent.target.id]: inputEvent.detail.value,
    }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-padding ion-text-center">
          <IonTitle color="primary">Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonAvatar className="ion-item-center avatar">
        <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
      </IonAvatar>
      <IonButton color="primary " className="tre ion-item-center">
        Change picture
      </IonButton>

      <IonContent className="ion-padding ion-text-center">
        <IonCardHeader>
          <IonCardSubtitle color="primary">Name:</IonCardSubtitle>
          <IonItem>
            <IonLabel position="floating" className="ion-text-center">
              {name}
            </IonLabel>
            <IonInput
              className="ion-text-center"
              onIonChange={onInputChange}
            ></IonInput>
          </IonItem>

          <IonCardSubtitle color="primary">Password:</IonCardSubtitle>
          <IonItem>
            <IonLabel position="floating" className="ion-text-center">
              {password}
            </IonLabel>
            <IonInput
              type="password"
              className="ion-text-center"
              onIonChange={onInputChange}
            ></IonInput>
          </IonItem>

          <IonCardSubtitle color="primary">eMail:</IonCardSubtitle>
          <IonItem>
            <IonLabel position="floating" className="ion-text-center">
              {email}
            </IonLabel>
            <IonInput
              className="ion-text-center"
              onIonChange={onInputChange}
            ></IonInput>
          </IonItem>
        </IonCardHeader>
        <IonButton color="primary">Update Profile</IonButton>
      </IonContent>
    </IonPage>
  );
};
// const Profile: React.FC = () => {
//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>
//             <h1>Profile</h1>
//           </IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <h1>Profile</h1>
//       </IonContent>
//     </IonPage>
//   );
// };

export default Profile;
