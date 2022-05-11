import { Route, Redirect } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import Register from "./components/Register";
import AuthContextProvider from "./components/context/AuthContex";
import ProtectedRoute from "./components/ProtectedRoute";
import Tabs from "./tabs/Home";
import Stripe from "./components/Stripe";
import Success from "./tabs/Succes";

setupIonicReact();

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/home" component={Tabs} />
            <Redirect from="/" to="login" exact />
            <Route path="/pay" component={Stripe} />
            <Route path="/success" component={Success} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthContextProvider>
  );
};

export default App;
