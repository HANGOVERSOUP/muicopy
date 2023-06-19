import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function TypographyScales() {
  return (
    <Box>
      <Typography level="display1">display1</Typography>
      <Typography level="display2">display2</Typography>
      <Typography level="h1">h1</Typography>
      <Typography level="h2">h2</Typography>
      <Typography level="h3">h3</Typography>
      <Typography level="h4">h4</Typography>
      <Typography level="title-lg">h5</Typography>
      <Typography level="body-lg">h6</Typography>
      <Typography level="body-md">body1</Typography>
      <Typography level="body-sm">body2</Typography>
      <Typography level="body-xs">body3</Typography>
      <Typography level="body4">body4</Typography>
      <Typography level="body5">body5</Typography>
    </Box>
  );
}
