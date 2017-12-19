import * as React from 'react';
import { StandardProps } from '../MuiProps';
import { BackdropProps } from './Backdrop';
import { TransitionDuration, TransitionHandlers } from '../transitions/transition';

export interface ModalProps
  extends StandardProps<
      React.HtmlHTMLAttributes<HTMLDivElement> & Partial<TransitionHandlers>,
      ModalClassKey
    > {
  BackdropClassName?: string;
  BackdropComponent?: string | React.ComponentType<BackdropProps>;
  BackdropInvisible?: boolean;
  BackdropTransitionDuration?: TransitionDuration;
  disableBackdrop?: boolean;
  ignoreBackdropClick?: boolean;
  ignoreEscapeKeyUp?: boolean;
  keepMounted?: boolean;
  modalManager?: object;
  onBackdropClick?: React.ReactEventHandler<{}>;
  onClose?: React.ReactEventHandler<{}>;
  onEscapeKeyUp?: React.ReactEventHandler<{}>;
  show?: boolean;
}

export type ModalClassKey = 'root' | 'hidden';

declare const Modal: React.ComponentType<ModalProps>;

export default Modal;
