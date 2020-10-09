import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/SliderStyled';

const Root = styled('div')`
  width: 300px;
`;

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number | number[],
  ) => {
    setValue(newValue as number[]);
  };

  return (
    <Root>
      <Typography id="range-slider-demo" gutterBottom>
        Temperature range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider-demo"
        getAriaValueText={valuetext}
      />
    </Root>
  );
}
