import * as React from 'react';
import Box from '@material-ui/core/Box';
import SelectField from '@material-ui/core/SelectField';
import MenuItem from '@material-ui/core/MenuItem';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function ValidationSelectFields() {
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiSelectField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <SelectField
          error
          id="outlined-error"
          label="Error"
          value={currency}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          error
          id="outlined-error-helper-text"
          label="Error"
          value={currency}
          onChange={handleChange}
          helperText="Incorrect entry."
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
      </div>
      <div>
        <SelectField
          error
          id="filled-error"
          label="Error"
          value={currency}
          onChange={handleChange}
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          error
          id="filled-error-helper-text"
          label="Error"
          value={currency}
          onChange={handleChange}
          helperText="Incorrect entry."
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
      </div>
      <div>
        <SelectField
          error
          id="standard-error"
          label="Error"
          value={currency}
          onChange={handleChange}
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          error
          id="standard-error-helper-text"
          label="Error"
          value={currency}
          onChange={handleChange}
          helperText="Incorrect entry."
          variant="standard"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
      </div>
    </Box>
  );
}
