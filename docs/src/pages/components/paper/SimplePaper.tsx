import * as React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        // TODO Replace with Stack
        '& > :not(style)': {
          m: 1,
          width: (theme) => theme.spacing(16),
          height: (theme) => theme.spacing(16),
        },
      }}
    >
      <Paper elevation={0} />
      <Paper />
      <Paper elevation={3} />
    </Box>
  );
}
