import * as React from 'react';

export interface StepContextType {
  index: number;
  last: boolean;
  expanded: boolean;
  icon: React.ReactNode;
  active: boolean;
  completed: boolean;
  disabled: boolean;
}

/**
 * @ignore - internal component.
 */
const StepContext = React.createContext<StepContextType | null>(null);

if (process.env.NODE_ENV !== 'production') {
  StepContext.displayName = 'StepContext';
}

/**
 * Returns the current StepContext.
 */
export function useStepContext(): StepContextType | null {
  return React.useContext(StepContext);
}

export default StepContext;
