import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function NestedModals({ random }) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          layout="center"
          {...(random && {
            sx: {
              top: `${randomBetween(25, 75)}%`,
              left: `${randomBetween(25, 75)}%`,
            },
          })}
        >
          <Typography
            id="nested-modal-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Infinite modals
          </Typography>
          <Typography
            id="nested-modal-description"
            textColor="text.tertiary"
            sx={{ mb: 1 }}
          >
            Welcome to the infinite nested modals.
          </Typography>
          <NestedModals random />
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
