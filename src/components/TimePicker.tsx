import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function TimeValidationTimePicker({ spot, booked }: any) {
  const [value, setValue] = React.useState<Date | null>(
    new Date("2020-01-01 12:00")
  );
  let avStart = Number(spot.time.avStart);
  let avEnd = Number(spot.time.avEnd);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        {/* <TimePicker
          renderInput={(params) => <TextField {...params} />}
          value={value}
          label="min/max time"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minTime={new Date(0, 0, 0, 6)}
          maxTime={new Date(0, 0, 0, 18, 45)}
        /> */}
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="From"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          shouldDisableTime={(timeValue, clockType) => {
            if (clockType === "hours") {
              for (let i = 0; i < booked?.length; i++) {
                if (
                  new Date(booked[i]?.startDate).getHours() <= timeValue &&
                  new Date(booked[i]?.endDate).getHours() >= timeValue
                ) {
                  console.log(
                    new Date(spot.time.booked[i].startDate).getHours()
                  );
                  console.log(new Date(spot.time.booked[i].endDate).getHours());
                  return true;
                }
              }
            }

            return false;
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
