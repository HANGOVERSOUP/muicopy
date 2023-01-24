import { UseSelectOptionSlotProps } from '../SelectUnstyled';
import { EventHandlers } from '../utils';

export interface UseOptionParameters<Value> {
  disabled: boolean;
  value: Value;
  optionRef?: React.Ref<HTMLElement>;
}

export interface UseOptionReturnValue {
  selected: boolean;
  highlighted: boolean;
  getRootProps: <Other extends EventHandlers>(
    otherHandlers?: Other,
  ) => UseOptionRootSlotProps<Other>;
}

export type UseOptionRootSlotProps<Other extends EventHandlers = {}> = UseSelectOptionSlotProps & {
  ref?: React.Ref<HTMLElement>;
} & Other;
