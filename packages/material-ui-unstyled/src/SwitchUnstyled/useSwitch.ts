import * as React from 'react';
import {
  unstable_useControlled as useControlled,
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@material-ui/utils';

export interface UseSwitchProps {
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the component is read only.
   */
  readOnly?: boolean;
  /**
   * If `true`, the `input` element is required.
   */
  required?: boolean;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler;
  onFocusVisible?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
}

export default function useSwitch(props: UseSwitchProps) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    required,
    onChange,
    onFocus,
    onFocusVisible,
    onBlur,
  } = props;

  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchUnstyled',
    state: 'checked',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    setCheckedState(event.target.checked);
    onChange?.(event);
  };

  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  const [focusVisible, setFocusVisible] = React.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);

  const inputRef = React.useRef<any>(null);

  const handleFocus = useEventCallback((event: React.FocusEvent<HTMLInputElement>) => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }

    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible?.(event);
    }

    onFocus?.(event);
  });

  const handleBlur = (event: React.FocusEvent) => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    onBlur?.(event);
  };

  const handleRefChange = useForkRef(focusVisibleRef, inputRef);

  return {
    getInputProps: (otherProps: object = {}) => ({
      checked: checkedProp,
      defaultChecked,
      disabled,
      readOnly,
      required,
      ...otherProps,
      onChange: handleInputChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ref: handleRefChange,
    }),
    isChecked: checked,
    isDisabled: Boolean(disabled),
    readOnly: Boolean(readOnly),
    hasVisibleFocus: focusVisible,
  };
}
