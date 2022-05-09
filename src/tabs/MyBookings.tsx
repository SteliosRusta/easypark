import React, { useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLoading,
} from "@ionic/react";
import { useAuth } from "../components/context/AuthContex";
import axios from "axios";

const MyBookings: React.FC = () => {
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_EASYPARK_API_URL}/booking`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const authContext = useAuth();

  if (!authContext) return null;

  const { setLoading, token } = authContext;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Bookings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>My Bookings</h1>
      </IonContent>
    </IonPage>
  );
};

export default MyBookings;
