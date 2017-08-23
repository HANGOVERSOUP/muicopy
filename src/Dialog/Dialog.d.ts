import * as React from 'react';
import { StyledComponent } from '..';
import { ModalProps } from '../internal/Modal';

export interface DialogProps extends ModalProps {
  fullScreen?: boolean;
  ignoreBackdropClick?: boolean;
  ignoreEscapeKeyUp?: boolean;
  enterTransitionDuration?: number | string;
  leaveTransitionDuration?: number | string;
  maxWidth?: 'xs' | 'sm' | 'md';
  onBackdropClick?: Function;
  onEscapeKeyUp?: Function;
  onRequestClose?: React.EventHandler<any>;
  open?: boolean;
  transition?: Function | React.ReactElement<any>;
}

export default class Dialog extends StyledComponent<DialogProps> {}
