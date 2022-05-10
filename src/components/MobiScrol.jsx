import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, setOptions, localeDe } from "@mobiscroll/react";

setOptions({
  locale: localeDe,
  theme: "ios",
  themeVariant: "light",
});

function MobiScrol({ booked }) {
  const invalid = [
    "2020-02-12",
    "2020-05-20",
    {
      recurring: {
        repeat: "weekly",
        weekDays: "SA,SU",
      },
    },
    {
      recurring: {
        repeat: "yearly",
        day: 24,
        month: 12,
      },
    },
    {
      recurring: {
        repeat: "yearly",
        day: 31,
        month: 12,
      },
    },
    {
      recurring: {
        repeat: "monthly",
        day: 1,
      },
    },
    {
      recurring: {
        repeat: "monthly",
        day: -1,
      },
    },
    {
      start: "2020-03-15",
      end: "2020-03-30",
    },
    {
      start: "2020-07-05",
      end: "2020-08-20",
    },
  ];

  return (
    <Datepicker
      onChange={(event, inst) => {
        console.log(event, inst);
      }}
      controls={["calendar", "time"]}
      display="bubble"
      invalid={[
        {
          start: booked[1].startDate.toString(),
          end: booked[1].endDate.toString(),
        },
        {
          start: booked[2].startDate.toString(),
          end: booked[2].endDate.toString(),
        },
        {
          start: "2022-04-01T09:00",
          end: "2022-04-01T18:30",
        },
        {
          start: "2022-05-20T09:40:48.193Z",
          end: "2022-05-20T12:40:48.193Z",
        },
      ]}
    />
  );
}

export default MobiScrol;
