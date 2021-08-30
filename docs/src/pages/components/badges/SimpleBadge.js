import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@material-ui/icons/Mail';

export default function SimpleBadge() {
  return (
    <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
  );
}
