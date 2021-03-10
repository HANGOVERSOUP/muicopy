/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import * as CSS from 'csstype';

const Box = styled('div')(({ theme }) => ({
  ...(theme.typography.body1 as CSS.Properties),
  '& > :not(style) + :not(style)': {
    marginLeft: theme.spacing(2),
  },
}));

export default function Links() {
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  return (
    <Box onClick={preventDefault}>
      <Link href="#">Link</Link>
      <Link href="#" color="inherit">
        {'color="inherit"'}
      </Link>
      <Link href="#" variant="body2">
        {'variant="body2"'}
      </Link>
    </Box>
  );
}
