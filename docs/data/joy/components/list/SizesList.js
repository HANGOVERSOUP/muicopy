import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Home from '@mui/icons-material/Home';

export default function SizesList() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        flexWrap: 'wrap',
        '& > *': { minWidth: 0, flexBasis: 120 },
      }}
    >
      {['sm', 'md', 'lg'].map((size) => (
        <Box key={size}>
          <Typography level="body2" fontWeight="lg" mb={1}>
            size=&quot;{size}&quot;
          </Typography>
          <List size={size} sx={{ bgcolor: 'background.surface', maxWidth: 240 }}>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Home />
                </ListItemDecorator>
                Home
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>Projects</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>Settings</ListItemButton>
            </ListItem>
          </List>
        </Box>
      ))}
    </Box>
  );
}
