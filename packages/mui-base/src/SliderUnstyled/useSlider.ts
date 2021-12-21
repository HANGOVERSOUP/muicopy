import * as React from 'react';
import {
  unstable_useIsFocusVisible as useIsFocusVisible,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_ownerDocument as ownerDocument,
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
  visuallyHidden,
} from '@mui/utils';
import SliderUnstyledProps from './SliderUnstyledProps';

interface Mark {
  value: number;
  label?: React.ReactNode;
}

export interface UseSliderProps {
  ref: React.Ref<any>;
  'aria-labelledby'?: SliderUnstyledProps['aria-labelledby'];
  defaultValue?: SliderUnstyledProps['defaultValue'];
  disabled?: SliderUnstyledProps['disabled'];
  disableSwap?: SliderUnstyledProps['disableSwap'];
  isRtl?: SliderUnstyledProps['isRtl'];
  marks?: SliderUnstyledProps['marks'];
  max?: SliderUnstyledProps['max'];
  min?: SliderUnstyledProps['min'];
  name?: SliderUnstyledProps['name'];
  onChange?: SliderUnstyledProps['onChange'];
  onMouseDown?: SliderUnstyledProps['onMouseDown'];
  onChangeCommitted?: SliderUnstyledProps['onChangeCommitted'];
  orientation?: SliderUnstyledProps['orientation'];
  scale?: SliderUnstyledProps['scale'];
  step?: SliderUnstyledProps['step'];
  tabIndex?: SliderUnstyledProps['tabIndex'];
  value?: SliderUnstyledProps['value'];
}

const INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;

function asc(a: number, b: number) {
  return a - b;
}

function clamp(value: number, min: number, max: number) {
  if (value == null) {
    return min;
  }
  return Math.min(Math.max(min, value), max);
}

function findClosest(values: number[], currentValue: number) {
  const { index: closestIndex } =
    values.reduce<{ distance: number; index: number } | null>(
      (acc, value: number, index: number) => {
        const distance = Math.abs(currentValue - value);

        if (acc === null || distance < acc.distance || distance === acc.distance) {
          return {
            distance,
            index,
          };
        }

        return acc;
      },
      null,
    ) ?? {};
  return closestIndex;
}

// TODO: Set the correct event type
function trackFinger(event: any, touchId: React.RefObject<any>) {
  if (touchId.current !== undefined && event.changedTouches) {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    }

    return false;
  }

  return {
    x: event.clientX,
    y: event.clientY,
  };
}

export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}

function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min;
}

function getDecimalPrecision(num: number) {
  // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
  // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split('e-');
    const matissaDecimalPart = parts[0].split('.')[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }

  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value: number, step: number, min: number) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

function setValueIndex({
  values,
  newValue,
  index,
}: {
  values: number[];
  newValue: number;
  index: number;
}) {
  const output = values.slice();
  output[index] = newValue;
  return output.sort(asc);
}

function focusThumb({
  sliderRef,
  activeIndex,
  setActive,
}: {
  sliderRef: React.RefObject<any>;
  activeIndex: number;
  setActive?: (num: number) => void;
}) {
  const doc = ownerDocument(sliderRef.current);
  if (
    !sliderRef.current?.contains(doc.activeElement) ||
    Number(doc?.activeElement?.getAttribute('data-index')) !== activeIndex
  ) {
    // @ts-ignore TODO: Property focus does not exists on type string
    sliderRef.current?.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }

  if (setActive) {
    setActive(activeIndex);
  }
}

const axisProps = {
  horizontal: {
    offset: (percent: number) => ({ left: `${percent}%` }),
    leap: (percent: number) => ({ width: `${percent}%` }),
  },
  'horizontal-reverse': {
    offset: (percent: number) => ({ right: `${percent}%` }),
    leap: (percent: number) => ({ width: `${percent}%` }),
  },
  vertical: {
    offset: (percent: number) => ({ bottom: `${percent}%` }),
    leap: (percent: number) => ({ height: `${percent}%` }),
  },
};

export const Identity = (x: any) => x;

// TODO: remove support for Safari < 13.
// https://caniuse.com/#search=touch-action
//
// Safari, on iOS, supports touch action since v13.
// Over 80% of the iOS phones are compatible
// in August 2020.
// Utilizing the CSS.supports method to check if touch-action is supported.
// Since CSS.supports is supported on all but Edge@12 and IE and touch-action
// is supported on both Edge@12 and IE if CSS.supports is not available that means that
// touch-action will be supported
let cachedSupportsTouchActionNone: any;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      cachedSupportsTouchActionNone = CSS.supports('touch-action', 'none');
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}

export default function useSlider(props: UseSliderProps) {
  const {
    ref,
    'aria-labelledby': ariaLabelledby,
    defaultValue,
    disableSwap = false,
    disabled = false,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    onMouseDown,
    orientation = 'horizontal',
    scale = Identity,
    step = 1,
    tabIndex,
    value: valueProp,
    isRtl = false,
  } = props;

  const touchId = React.useRef<number>();
  // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transferred when inversing a range slider.
  const [active, setActive] = React.useState(-1);
  const [open, setOpen] = React.useState(-1);
  const [dragging, setDragging] = React.useState(false);
  const moveCount = React.useRef(0);

  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue ?? min,
    name: 'Slider',
  });

  const handleChange =
    onChange &&
    ((event: Event | React.SyntheticEvent, value: number | number[], thumbIndex: number) => {
      // Redefine target to allow name and value to be read.
      // This allows seamless integration with the most popular form libraries.
      // https://github.com/mui-org/material-ui/issues/13485#issuecomment-676048492
      // Clone the event to not override `target` of the original event.
      // @ts-ignore nativeEvent does not exists on Event
      const nativeEvent = event.nativeEvent || event;
      // @ts-ignore TODO: check this again
      const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

      Object.defineProperty(clonedEvent, 'target', {
        writable: true,
        value: { value, name },
      });

      // @ts-ignore TODO: value could be undefined?
      onChange(clonedEvent, value, thumbIndex);
    });

  const range = Array.isArray(valueDerived);
  let values = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values = values.map((value) => clamp(value, min, max));
  const marks =
    marksProp === true && step !== null
      ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
          value: min + step * index,
        }))
      : marksProp || [];

  const marksValues = (marks as Mark[]).map((mark: Mark) => mark.value);

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(-1);

  const sliderRef = React.useRef<HTMLSpanElement>();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);

  const createHandleHiddenInputFocus =
    (otherHandlers: Record<string, React.EventHandler<any>>) => (event: React.FocusEvent) => {
      const index = Number(event.currentTarget.getAttribute('data-index'));
      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(index);
      }
      setOpen(index);
      otherHandlers?.onFocus?.(event);
    };
  const createHandleHidenInputBlur =
    (otherHandlers: Record<string, React.EventHandler<any>>) => (event: React.FocusEvent) => {
      handleBlurVisible(event);
      if (isFocusVisibleRef.current === false) {
        setFocusVisible(-1);
      }
      setOpen(-1);
      otherHandlers?.onBlur?.(event);
    };

  useEnhancedEffect(() => {
    if (disabled && sliderRef.current!.contains(document.activeElement)) {
      // This is necessary because Firefox and Safari will keep focus
      // on a disabled element:
      // https://codesandbox.io/s/mui-pr-22247-forked-h151h?file=/src/App.js
      // @ts-ignore
      document.activeElement?.blur();
    }
  }, [disabled]);

  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusVisible !== -1) {
    setFocusVisible(-1);
  }

  const createHandleHiddenInputChange =
    (otherHandlers: Record<string, React.EventHandler<any>>) => (event: React.ChangeEvent) => {
      const index = Number(event.currentTarget.getAttribute('data-index'));
      const value = values[index];
      const marksIndex = marksValues.indexOf(value);

      // @ts-ignore
      let newValue = event.target.valueAsNumber;

      if (marks && step == null) {
        newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
      }

      newValue = clamp(newValue, min, max);

      if (marks && step == null) {
        const currentMarkIndex = marksValues.indexOf(values[index]);

        newValue =
          newValue < values[index]
            ? marksValues[currentMarkIndex - 1]
            : marksValues[currentMarkIndex + 1];
      }

      if (range) {
        // Bound the new value to the thumb's neighbours.
        if (disableSwap) {
          newValue = clamp(newValue, values[index - 1] || -Infinity, values[index + 1] || Infinity);
        }

        const previousValue = newValue;
        newValue = setValueIndex({
          values,
          newValue,
          index,
        });

        let activeIndex = index;

        // Potentially swap the index if needed.
        if (!disableSwap) {
          activeIndex = newValue.indexOf(previousValue);
        }

        focusThumb({ sliderRef, activeIndex });
      }

      setValueState(newValue);
      setFocusVisible(index);

      if (handleChange) {
        handleChange(event, newValue, index);
      }

      if (onChangeCommitted) {
        onChangeCommitted(event, newValue);
      }

      otherHandlers.onChange?.(event);
    };

  const previousIndex = React.useRef<number>();
  let axis = orientation;
  if (isRtl && orientation === 'horizontal') {
    axis += '-reverse';
  }

  const getFingerNewValue = ({
    finger,
    move = false,
    values: values2,
  }: {
    finger: { x: number; y: number };
    move?: boolean;
    values: number[];
  }) => {
    const { current: slider } = sliderRef;
    const { width, height, bottom, left } = slider!.getBoundingClientRect();
    let percent;

    if (axis.indexOf('vertical') === 0) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }

    if (axis.indexOf('-reverse') !== -1) {
      percent = 1 - percent;
    }

    let newValue;
    newValue = percentToValue(percent, min, max);
    if (step) {
      newValue = roundValueToStep(newValue, step, min);
    } else {
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex!];
    }

    newValue = clamp(newValue, min, max);
    let activeIndex = 0;

    if (range) {
      if (!move) {
        activeIndex = findClosest(values2, newValue)!;
      } else {
        activeIndex = previousIndex.current!;
      }

      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(
          newValue,
          values2[activeIndex - 1] || -Infinity,
          values2[activeIndex + 1] || Infinity,
        );
      }

      const previousValue = newValue;
      newValue = setValueIndex({
        values: values2,
        newValue,
        index: activeIndex,
      });

      // Potentially swap the index if needed.
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }

    return { newValue, activeIndex };
  };

  const handleTouchMove = useEventCallback((nativeEvent: TouchEvent | MouseEvent) => {
    const finger = trackFinger(nativeEvent, touchId);

    if (!finger) {
      return;
    }

    moveCount.current += 1;

    // Cancel move in case some other element consumed a mouseup event and it was not fired.
    // @ts-ignore buttons doesn't not exists on touch event
    if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleTouchEnd(nativeEvent);
      return;
    }

    const { newValue, activeIndex } = getFingerNewValue({
      finger,
      move: true,
      values,
    });

    focusThumb({ sliderRef, activeIndex, setActive });
    setValueState(newValue);

    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }

    if (handleChange) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });

  const handleTouchEnd = useEventCallback((nativeEvent: TouchEvent | MouseEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);

    if (!finger) {
      return;
    }

    const { newValue } = getFingerNewValue({ finger, values });

    setActive(-1);
    if (nativeEvent.type === 'touchend') {
      setOpen(-1);
    }

    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }

    touchId.current = undefined;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();
  });

  const handleTouchStart = useEventCallback((nativeEvent: TouchEvent) => {
    // If touch-action: none; is not supported we need to prevent the scroll manually.
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }

    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchId);
    if (finger !== false) {
      const { newValue, activeIndex } = getFingerNewValue({ finger, values });
      focusThumb({ sliderRef, activeIndex, setActive });

      setValueState(newValue);

      if (handleChange) {
        handleChange(nativeEvent, newValue, activeIndex);
      }
    }

    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener('touchmove', handleTouchMove);
    doc.addEventListener('touchend', handleTouchEnd);
  });

  const stopListening = React.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener('mousemove', handleTouchMove);
    doc.removeEventListener('mouseup', handleTouchEnd);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);

  React.useEffect(() => {
    const { current: slider } = sliderRef;
    slider!.addEventListener('touchstart', handleTouchStart, {
      passive: doesSupportTouchActionNone(),
    });

    return () => {
      // @ts-ignore
      slider!.removeEventListener('touchstart', handleTouchStart, {
        passive: doesSupportTouchActionNone(),
      });

      stopListening();
    };
  }, [stopListening, handleTouchStart]);

  React.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);

  const createHandleMouseDown =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      if (onMouseDown) {
        onMouseDown(event);
      }

      // Only handle left clicks
      if (event.button !== 0) {
        return;
      }

      // Avoid text selection
      event.preventDefault();
      const finger = trackFinger(event, touchId);
      if (finger !== false) {
        const { newValue, activeIndex } = getFingerNewValue({ finger, values });
        focusThumb({ sliderRef, activeIndex, setActive });

        setValueState(newValue);

        if (handleChange) {
          handleChange(event, newValue, activeIndex);
        }
      }

      moveCount.current = 0;
      const doc = ownerDocument(sliderRef.current);
      doc.addEventListener('mousemove', handleTouchMove);
      doc.addEventListener('mouseup', handleTouchEnd);

      otherHandlers.onMouseDown?.(event);
    };

  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;

  const getRootProps = (otherHandlers?: Record<string, React.EventHandler<any>>) => {
    const ownEventHandlers = {
      onMouseDown: createHandleMouseDown(otherHandlers || {}),
    };

    const mergedEventHandlers: Record<string, React.EventHandler<any>> = {
      ...otherHandlers,
      ...ownEventHandlers,
    };
    return {
      ref: handleRef,
      ...mergedEventHandlers,
    };
  };

  const createHandleMouseOver =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      const index = Number(event.currentTarget.getAttribute('data-index'));
      setOpen(index);

      otherHandlers.onMouseOver?.(event);
    };

  const createHandleMouseLeave =
    (otherHandlers: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setOpen(-1);

      otherHandlers.onMouseLeave?.(event);
    };

  const getThumbProps = (otherHandlers?: Record<string, React.EventHandler<any>>) => {
    const ownEventHandlers = {
      onMouseOver: createHandleMouseOver(otherHandlers || {}),
      onMouseLeave: createHandleMouseLeave(otherHandlers || {}),
    };

    const mergedEventHandlers: Record<string, React.EventHandler<any>> = {
      ...otherHandlers,
      ...ownEventHandlers,
    };
    return {
      ...mergedEventHandlers,
    };
  };

  const getHiddenInputProps = (otherHandlers?: Record<string, React.EventHandler<any>>) => {
    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(otherHandlers || {}),
      onFocus: createHandleHiddenInputFocus(otherHandlers || {}),
      onBlur: createHandleHidenInputBlur(otherHandlers || {}),
    };

    const mergedEventHandlers: Record<string, React.EventHandler<any>> = {
      ...otherHandlers,
      ...ownEventHandlers,
    };

    return {
      tabIndex,
      'aria-labelledby': ariaLabelledby,
      'aria-orientation': orientation,
      'aria-valuemax': scale(max),
      'aria-valuemin': scale(min),
      name,
      type: 'range',
      min: props.min,
      max: props.max,
      step: props.step,
      disabled,
      ...mergedEventHandlers,
      style: {
        ...visuallyHidden,
        direction: isRtl ? 'rtl' : 'ltr',
        // So that VoiceOver's focus indicator matches the thumb's dimensions
        width: '100%',
        height: '100%',
      },
    };
  };

  return {
    axis,
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    dragging,
    marks,
    values,
    active,
    focusVisible,
    open,
    range,
    trackOffset,
    trackLeap,
  };
}
