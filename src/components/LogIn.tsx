import "./LogIn.css";
import { useState } from "react";
import {
  IonRow,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonAlert,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  InputCustomEvent,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { personCircle } from "ionicons/icons";
import { useAuth } from "./context/AuthContex";
function validateEmail(email: string) {
  const re =
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

interface UserData {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const [{ email, password }, setFormState] = useState<UserData>({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const history = useHistory();
  const authContext = useAuth();

  if (!authContext) return null;

  const { userLogin, isAuthenticated, setLoading } = authContext;

  const onInputChange = (event: Event) => {
    const inputEvent = event as InputCustomEvent;

    setFormState((prev) => ({
      ...prev,
      [inputEvent.target.id]: inputEvent.detail.value,
    }));
  };
  const handleLogin = async () => {
    if (!email) {
      setMessage("Please enter a valid email");
      setIsError(true);
      return;
    }
    if (validateEmail(email) === false) {
      setMessage("Your email is invalid");
      setIsError(true);
      return;
    }

    if (!password || password.length < 6) {
      setMessage("Please enter your password");
      setIsError(true);
      return;
    }

    const loginData: UserData = {
      email: email,
      password: password,
    };
    await userLogin(loginData);
    history.replace("/home", { replace: true });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={isError}
                onDidDismiss={() => setIsError(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Email</IonLabel>
                <IonInput
                  type="email"
                  id="email"
                  onIonChange={onInputChange}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Password</IonLabel>
                <IonInput
                  type="password"
                  id="password"
                  onIonChange={onInputChange}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p style={{ fontSize: "small" }}>
                By clicking LOGIN you agree to our <a href="#">Policy</a>
              </p>
              <IonButton expand="block" onClick={handleLogin}>
                Login
              </IonButton>
              <p style={{ fontSize: "medium" }}>
                Don't have an account? <br />
                <IonButton fill="outline" size="small" href="/register">
                  <IonLabel>SIGN UP</IonLabel>
                </IonButton>
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LogIn;
