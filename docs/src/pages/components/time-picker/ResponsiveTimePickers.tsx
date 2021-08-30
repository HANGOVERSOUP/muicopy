import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import MobileTimePicker from '@material-ui/lab/MobileTimePicker';
import DesktopTimePicker from '@material-ui/lab/DesktopTimePicker';

export default function ResponsiveTimePickers() {
  const [value, setValue] = React.useState<Date | null>(
    new Date('2018-01-01T00:00:00.000Z'),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileTimePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopTimePicker
          label="For desktop"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          value={value}
          onChange={setValue}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
