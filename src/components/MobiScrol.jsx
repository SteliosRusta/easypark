import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, setOptions, localeDe } from "@mobiscroll/react";
import { daysToWeeks } from "date-fns";

setOptions({
  locale: localeDe,
  theme: "ios",
  themeVariant: "light",
});

function MobiScrol({ booked, setSelectedDate, avDays }) {
  const allDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const newDays = allDays.filter((day) => avDays.indexOf(day) === -1);
  console.log(newDays, avDays);
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
        console.log(event);
        setSelectedDate(event.value);
      }}
      controls={["calendar", "time"]}
      display="inline"
      invalid={[
        ...booked,
        {
          recurring: {
            repeat: "weekly",
            weekDays: newDays.toString(),
          },
        },
      ]}
    />
  );
}

export default MobiScrol;
