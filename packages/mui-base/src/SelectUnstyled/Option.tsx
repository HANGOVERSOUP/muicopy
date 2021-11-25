export interface OptionProps<TValue> {
  /**
   * The value of the option.
   */
  value: TValue;
  children?: React.ReactNode;
  /**
   * If `true`, the option will be disabled.
   */
  disabled?: boolean;
}

type OptionType = <TValue extends {}>(props: OptionProps<TValue>) => React.ReactElement | null;

const Option: OptionType = function Option() {
  return null;
};

export default Option;
