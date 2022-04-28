import React from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { car, home, list, person, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import HomePage from "./HomePage";
import Profile from "./Profile";
import MySpots from "./MySpots";
import MyBookings from "./MyBookings";

const Tabs: React.FC = () => (
  <IonReactRouter>
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/">
          <IonIcon icon={home} />
          <IonLabel>home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>

        <IonTabButton tab="<myBookings>" href="/mybookings">
          <IonIcon icon={list} />
          <IonLabel>My Bookings</IonLabel>
        </IonTabButton>

        <IonTabButton tab="<mySpots>" href="/myspots">
          <IonIcon icon={car} />
          <IonLabel>My Spots</IonLabel>
        </IonTabButton>
      </IonTabBar>

      <IonRouterOutlet>
        <Route path="/" component={HomePage} />
        <Route path="/profile" component={Profile} />
        <Route path="/mybookings" component={MyBookings} />
        <Route path="/myspots" component={MySpots} />
      </IonRouterOutlet>
    </IonTabs>
  </IonReactRouter>
);

export default Tabs;
