import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function FilledMultilineHiddenLabelTextField() {
  return <TextField variant="filled" multiline rows={3} hiddenLabel />;
}
