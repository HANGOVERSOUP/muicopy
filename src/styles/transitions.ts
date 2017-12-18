/* eslint-disable no-param-reassign */

import * as warning from 'warning';

export interface Easing {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
}

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
export const easing: Easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

export interface Duration {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  enteringScreen: number;
  leavingScreen: number;
}

// Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
export const duration: Duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195,
};

export const formatMs = (milliseconds: number) => `${Math.round(milliseconds)}ms`;
export const isString = (value: any) => typeof value === 'string';
export const isNumber = (value: any) => !Number.isNaN(parseFloat(value));

export interface Transitions {
  easing: Easing;
  duration: Duration;
  create(
    props: string | string[],
    options?: Partial<{ duration: number; easing: string; delay: number }>,
  ): string;
  getAutoHeightDuration(height: number): number;
}

export interface TransitionsOptions {
  easing?: Partial<Easing>;
  duration?: Partial<Duration>;
  create?: (
    props: string | string[],
    options?: Partial<{ duration: number; easing: string; delay: number }>,
  ) => string;
  getAutoHeightDuration?: (height: number) => number;
}

// interface TransitionsOptions {
// prop?: string, duration?: number, easing?: string, delay?: number
// }
/**
 * @param {string|Array} props
 * @param {object} param
 * @param {string} param.prop
 * @param {number} param.duration
 * @param {string} param.easing
 * @param {number} param.delay
 */
const transitions: Transitions = {
  easing,
  duration,
  create(
    props = ['all'], // string | Array<string>
    options = {},
  ) {
    const {
      duration: durationOption = duration.standard,
      easing: easingOption = easing.easeInOut,
      delay = 0,
      ...other,
    } = options;

    warning(
      isString(props) || Array.isArray(props),
      'Material-UI: argument "props" must be a string or Array',
    );
    warning(
      isNumber(durationOption),
      `Material-UI: argument "duration" must be a number but found ${durationOption}`,
    );
    warning(isString(easingOption), 'Material-UI: argument "easing" must be a string');
    warning(isNumber(delay), 'Material-UI: argument "delay" must be a string');
    warning(
      Object.keys(other).length === 0,
      `Material-UI: unrecognized argument(s) [${Object.keys(other).join(',')}]`,
    );

    return (Array.isArray(props) ? props : [props])
      .map(
        animatedProp =>
          `${animatedProp} ${formatMs(durationOption)} ${easingOption} ${formatMs(delay)}`,
      )
      .join(',');
  },
  getAutoHeightDuration(height) {
    if (!height) {
      return 0;
    }

    const constant = height / 36;

    // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
  },
};

export default transitions;
