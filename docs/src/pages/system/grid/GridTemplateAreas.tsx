import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function Display() {
  return (
    <div style={{ width: '100%', height: '120px' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '80px 80px 80px 80px',
          gridTemplateRows: 'auto',
          gridTemplateAreas: `"header header header header"
        "main main . sidebar"
        "footer footer footer footer"`,
        }}
      >
        <Box
          sx={{ bgcolor: 'primary.main', color: 'white', p: 1, gridArea: 'header' }}
        >
          Header
        </Box>
        <Box
          sx={{ bgcolor: 'secondary.main', color: 'white', p: 1, gridArea: 'main' }}
        >
          Main
        </Box>
        <Box
          sx={{ bgcolor: 'info.main', p: 1, color: 'white', gridArea: 'sidebar' }}
        >
          Sidebar
        </Box>
        <Box
          sx={{ bgcolor: 'warning.main', color: 'white', p: 1, gridArea: 'footer' }}
        >
          Footer
        </Box>
      </Box>
    </div>
  );
}
