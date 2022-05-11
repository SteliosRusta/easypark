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
} from "@ionic/react";
import "./Profile.css";
import { useAuth } from "../components/context/AuthContex";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface UserData {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  _id?: string;
}

export const Profile: React.FC = () => {
  const history = useHistory();
  const authContext = useAuth();
  const [{ name, email, password }, setFormState] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    _id: "",
  });
  if (!authContext) return null;
  const { logOut, user, token, setLoading } = authContext;

  console.log(user);

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
              {user?.name}
            </IonLabel>
            <IonInput
              className="ion-text-center"
              onIonChange={onInputChange}
            ></IonInput>
          </IonItem>

          <IonCardSubtitle color="primary">Password:</IonCardSubtitle>
          <IonItem>
            <IonLabel position="floating" className="ion-text-center">
              {user?.password}
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
              {user?.email}
            </IonLabel>
            <IonInput
              className="ion-text-center"
              onIonChange={onInputChange}
            ></IonInput>
          </IonItem>
        </IonCardHeader>
        <IonButton
          onClick={async () => {
            const formData = {
              name: name,
              email: email,
              password: password,
            };
            try {
              setLoading(true);
              await axios.put(
                `${process.env.REACT_APP_EASYPARK_API_URL}/auth/me/6273f117b7d0a8c441c9a558`,
                formData,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          }}
          color="primary"
        >
          Update Profile
        </IonButton>
        <IonButton
          onClick={() => {
            logOut();
            history.replace("/login");
          }}
          color="danger"
        >
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
