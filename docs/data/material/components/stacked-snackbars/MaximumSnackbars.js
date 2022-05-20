import * as React from 'react';
import PropTypes from 'prop-types';
import SnackbarsProvider from '@mui/lab/SnackbarsProvider';
import useSnackbars from '@mui/lab/useSnackbars';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';

function MyApp({ snackbarLimit, setSnackbarLimit }) {
  const snackbars = useSnackbars();

  return (
    <Stack spacing={2}>
      <ButtonGroup sx={{ justifyContent: 'center' }}>
        <Button
          disabled={snackbarLimit === 1}
          onClick={() => setSnackbarLimit((prevState) => prevState - 1)}
        >
          -
        </Button>
        <Button disableRipple>{snackbarLimit}</Button>
        <Button
          disabled={snackbarLimit === 10}
          onClick={() => setSnackbarLimit((prevState) => prevState + 1)}
        >
          +
        </Button>
      </ButtonGroup>
      <Button
        onClick={() =>
          snackbars.showSnackbar({
            message: 'Note archived',
            autoHideDuration: 4000,
          })
        }
      >
        Show Snackbar
      </Button>
    </Stack>
  );
}

MyApp.propTypes = {
  setSnackbarLimit: PropTypes.func.isRequired,
  snackbarLimit: PropTypes.number.isRequired,
};

export default function MaximumSnackbars() {
  const [snackbarLimit, setSnackbarLimit] = React.useState(2);
  return (
    <SnackbarsProvider limit={snackbarLimit}>
      <MyApp snackbarLimit={snackbarLimit} setSnackbarLimit={setSnackbarLimit} />
    </SnackbarsProvider>
  );
}
