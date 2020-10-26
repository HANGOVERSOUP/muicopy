export type ChainedFunction = ((...args: any[]) => void) | undefined | null;

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 * @param {function} functions to chain
 * @returns {function|null}
 */
export default function createChainedFunction(
  ...funcs: ChainedFunction[]
): (...args: any[]) => never {
  return funcs.reduce(
    (acc, func) => {
      if (func == null) {
        return acc;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (typeof func !== 'function') {
          console.error(
            'Material-UI: Invalid Argument Type, must only provide functions, undefined, or null.',
          );
        }
      }

      return function chainedFunction(...args) {
        // @ts-ignore
        acc.apply(this, args);
        // @ts-ignore
        func.apply(this, args);
      };
    },
    () => {},
  ) as (...args: any[]) => never;
}
