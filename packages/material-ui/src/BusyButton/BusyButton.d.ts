import { ExtendButton, ExtendButtonTypeMap } from '../Button';
import { OverrideProps } from '../OverridableComponent';

export type BusyButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonTypeMap<{
  props: P & {
    /**
     * The content of the button.
     */
    pending?: boolean;
    /**
     * Element placed before the children if the button is in pending state.
     */
    pendingIndicator?: React.ReactNode;
    /**
     * The pending indicator can be positioned on the start, end or the center of the Button.
     */
    pendingIndicatorPosition?: 'start' | 'end' | 'center';
  };
  defaultComponent: D;
  classKey: BusyButtonClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Button Group](https://material-ui.com/components/button-group/)
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [BusyButton API](https://material-ui.com/api/pending-button/)
 * - inherits [Button API](https://material-ui.com/api/button/)
 */
declare const BusyButton: ExtendButton<BusyButtonTypeMap>;

export type BusyButtonProps<
  D extends React.ElementType = BusyButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BusyButtonTypeMap<P, D>, D>;

export type BusyButtonClassKey = 'root' | 'pending';

export default BusyButton;
