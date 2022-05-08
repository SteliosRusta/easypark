import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonModal,
  IonList,
  IonInput,
  useIonPicker,
  IonChip,
  IonRange,
  IonItemDivider,
} from "@ionic/react";
import { pin, closeCircle, heart, close } from "ionicons/icons";

const MySpots: React.FC = () => {
  const [text, setText] = useState<string>();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [present] = useIonPicker();
  const [value, setValue] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  console.log(selectedDays);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Parking Spots</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonButton expand="full" size="large" color="primary" id="create-spot">
          Add Spot
        </IonButton>
        <IonModal canDismiss={true} trigger="create-spot">
          <IonContent>
            <IonList>
              <IonItemDivider>Location</IonItemDivider>
              <IonItem>
                <IonLabel position="stacked">Address</IonLabel>
                <IonInput placeholder="Address Line 1"></IonInput>
                <IonInput placeholder="Address Line 2"></IonInput>
                <IonInput placeholder="City"></IonInput>
                <IonInput placeholder="State"></IonInput>
                <IonInput placeholder="Zip Code"></IonInput>
              </IonItem>
              <IonItemDivider>Cost</IonItemDivider>
              <IonItem>
                <IonLabel position="floating">Price per hour in Euro</IonLabel>
                <IonInput value={text}></IonInput>
              </IonItem>
              <IonItemDivider>Availability</IonItemDivider>
              <IonButton
                size="default"
                fill="outline"
                color="Light"
                onClick={() =>
                  present({
                    buttons: [
                      {
                        text: "Confirm",
                        handler: (selected) => {
                          setValue(selected.days.value);
                          setSelectedDays((prev) => [
                            ...new Set([...prev, selected.days.value]),
                          ]);
                        },
                      },
                    ],
                    columns: [
                      {
                        name: "days",
                        options: [
                          { text: "Monday", value: "Monday" },
                          { text: "Tuesday", value: "Tuesday" },
                          { text: "Wednesday", value: "Wednesday" },
                          { text: "Thursday", value: "Thursday" },
                          { text: "Friday", value: "Friday" },
                          { text: "Saturday", value: "Saturday" },
                          { text: "Sunday", value: "Sunday" },
                        ],
                      },
                    ],
                  })
                }
              >
                Choose available days{" "}
              </IonButton>
              <br></br>
              {value && selectedDays
                ? selectedDays.map((day) => {
                    return (
                      <IonChip key={day}>
                        <IonLabel>{day}</IonLabel>
                        <IonIcon
                          icon={closeCircle}
                          onClick={() =>
                            setSelectedDays((prev) =>
                              prev.filter((el) => el !== day)
                            )
                          }
                        />
                      </IonChip>
                    );
                  })
                : null}
              <br></br>
              <IonButton
                size="default"
                fill="outline"
                color="Light"
                onClick={() =>
                  present(
                    [
                      {
                        name: "hour",
                        options: [
                          { text: "1", value: "1" },
                          { text: "2", value: "2" },
                          { text: "3", value: "3" },
                          { text: "4", value: "4" },
                          { text: "5", value: "5" },
                          { text: "6", value: "6" },
                          { text: "7", value: "7" },
                          { text: "8", value: "8" },
                          { text: "9", value: "9" },
                          { text: "10", value: "10" },
                          { text: "11", value: "11" },
                          { text: "12", value: "12" },
                        ],
                      },
                      {
                        name: "time",
                        options: [
                          { text: "AM", value: "AM" },
                          { text: "PM", value: "PM" },
                        ],
                      },
                    ],
                    [
                      {
                        text: "Confirm",
                        handler: (selected) => {
                          setFrom(
                            `${selected.hour.value} ${selected.time.value}`
                          );
                        },
                      },
                    ]
                  )
                }
              >
                {" "}
                From :
              </IonButton>
              {from && <div>Available from: {from}</div>}
              <br></br>
              <IonButton
                size="default"
                fill="outline"
                color="Light"
                onClick={() =>
                  present(
                    [
                      {
                        name: "hour",
                        options: [
                          { text: "1", value: "1" },
                          { text: "2", value: "2" },
                          { text: "3", value: "3" },
                          { text: "4", value: "4" },
                          { text: "5", value: "5" },
                          { text: "6", value: "6" },
                          { text: "7", value: "7" },
                          { text: "8", value: "8" },
                          { text: "9", value: "9" },
                          { text: "10", value: "10" },
                          { text: "11", value: "11" },
                          { text: "12", value: "12" },
                        ],
                      },
                      {
                        name: "time",
                        options: [
                          { text: "AM", value: "AM" },
                          { text: "PM", value: "PM" },
                        ],
                      },
                    ],
                    [
                      {
                        text: "Confirm",
                        handler: (selected) => {
                          setTo(
                            `${selected.hour.value} ${selected.time.value}`
                          );
                        },
                      },
                    ]
                  )
                }
              >
                {" "}
                To :
              </IonButton>
              {to && <div>Available up to: {to}</div>}
            </IonList>
          </IonContent>
        </IonModal>

        <IonCard>
          <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonLabel>ion-item in a card, icon left, button right</IonLabel>
            <IonButton color="danger" fill="solid" slot="end">
              Delete
            </IonButton>
          </IonItem>

          <IonCardContent>
            This is content, without any paragraph or header tags, within an
            ion-cardContent element.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MySpots;
