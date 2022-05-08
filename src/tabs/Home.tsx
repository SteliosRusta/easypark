import React from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { car, home, list, person } from "ionicons/icons";
import { Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import "./HomePage.css";

import HomePage from "./HomePage";
import Profile from "./Profile";
import MySpots from "./MySpots";
import MyBookings from "./MyBookings";

const Tabs: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home/homepage">
            <IonIcon icon={home} />
            <IonLabel>home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/home/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>

          <IonTabButton tab="<myBookings>" href="/home/mybookings">
            <IonIcon icon={list} />
            <IonLabel>My Bookings</IonLabel>
          </IonTabButton>

          <IonTabButton tab="<mySpots>" href="/home/myspots">
            <IonIcon icon={car} />
            <IonLabel>My Spots</IonLabel>
          </IonTabButton>
        </IonTabBar>

        <IonRouterOutlet>
          <Route path="/home/homepage" component={HomePage} />
          <Route path="/home/profile" component={Profile} />
          <Route path="/home/mybookings" component={MyBookings} />
          <Route path="/home/myspots" component={MySpots} />
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Tabs;
