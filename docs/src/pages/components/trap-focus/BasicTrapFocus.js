import * as React from 'react';
import TrapFocus from '@material-ui/core/Unstable_TrapFocus';

export default function BasicTrapFocus() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <br />
      {open && (
        <TrapFocus open isEnabled={() => true} getDoc={() => document}>
          <div tabIndex={-1}>
            <h3>Quick form</h3>
            <input aria-label="first name" placeholder="First name" />
            <input aria-label="last name" placeholder="Last name" />
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </TrapFocus>
      )}
    </div>
  );
}
