import { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonPage,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import LandingPage from "./pages/LandingPage";
import HomePage from "./tabs/HomePage";
import Profile from "./tabs/Profile";
import MyBookings from "./tabs/MyBookings";
import MySpots from "./tabs/MySpots";
import Home from "./tabs/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import LogIn from "./components/LogIn";

setupIonicReact();

const App: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState<boolean>(true);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={LogIn} />
          <Redirect from="/" to="login" exact />
          <Route path="/home" component={Home} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
