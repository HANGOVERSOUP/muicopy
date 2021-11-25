import clsx from 'clsx';
import React from 'react';
import composeClasses from '../composeClasses';
import { OptionProps } from './Option';
import { OptionGroupProps } from './OptionGroup';
import selectUnstyledClasses, { getSelectUnstyledUtilityClass } from './selectUnstyledClasses';
import { SelectUnstyledOwnerState, SelectUnstyledOwnProps } from './SelectUnstyledProps';
import { isOptionGroup, SelectChild, SelectOption, SelectOptionGroup } from './useSelectProps';
import { appendOwnerState } from '../utils';
import { OptionState } from '../ListboxUnstyled';

export function areOptionsEqual<TValue>(
  option1: SelectOption<TValue>,
  option2: SelectOption<TValue>,
) {
  return (
    option1.label === option2.label &&
    option1.value === option2.value &&
    option1.disabled === option2.disabled
  );
}

export function getOptionsFromChildren<TValue>(
  children: React.ReactNode,
  startIndex?: { current: number },
): SelectChild<TValue>[] {
  if (children == null) {
    return [];
  }

  if (startIndex == null) {
    startIndex = { current: 0 };
  }

  const selectChildren: SelectChild<TValue>[] = [];

  React.Children.forEach(children, (node: React.ReactNode) => {
    const nodeChildren = (node as React.ReactElement)?.props?.children;
    if ((node as React.ReactElement)?.props?.value === undefined) {
      if (nodeChildren != null) {
        const element = node as React.ReactElement<OptionGroupProps>;

        const group: SelectOptionGroup<TValue> = {
          options: getOptionsFromChildren<TValue>(nodeChildren, startIndex),
          label: element.props.label,
          disabled: element.props.disabled ?? false,
        };

        selectChildren.push(group);
      }

      return;
    }

    const element = node as React.ReactElement<OptionProps<TValue>>;

    const option = {
      value: element.props.value,
      label: element.props.children,
      disabled: element.props.disabled ?? false,
      index: startIndex!.current,
    };

    startIndex!.current += 1;
    selectChildren.push(option);
  });

  return selectChildren ?? [];
}

export function useUtilityClasses(ownerState: SelectUnstyledOwnerState) {
  const { active, disabled, open, focusVisible } = ownerState;

  const slots = {
    button: [
      'button',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      active && 'active',
      open && 'expanded',
    ],
    listbox: ['listbox', disabled && 'disabled'],
    option: ['option'],
  };

  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}

export function flattenOptionGroups<TValue>(
  groupedOptions: SelectChild<TValue>[],
  isGroupDisabled: boolean = false,
): SelectOption<TValue>[] {
  let flatOptions: SelectOption<TValue>[] = [];
  groupedOptions.forEach((optionOrGroup) => {
    if (isOptionGroup(optionOrGroup)) {
      flatOptions = flatOptions.concat(
        flattenOptionGroups(optionOrGroup.options, optionOrGroup.disabled),
      );
    } else {
      flatOptions.push({
        ...optionOrGroup,
        disabled: isGroupDisabled || optionOrGroup.disabled,
      });
    }
  });

  return flatOptions;
}

interface RenderOptionParameters<TValue> {
  option: SelectChild<TValue>;
  itemIndex: number;
  getOptionState: (optionIndex: number) => OptionState<SelectOption<TValue>>;
  getOptionProps: (optionIndex: number) => Record<string, any>;
  componentsProps: Required<SelectUnstyledOwnProps<TValue>>['componentsProps'];
  listboxOption: React.ElementType;
  listboxOptionGroupRoot: React.ElementType;
  listboxOptionGroupHeader: React.ElementType;
  listboxOptionGroupOptions: React.ElementType;
  ownerState: SelectUnstyledOwnerState;
  optionClassName: string;
}

type RenderGroupParameters<TValue> = RenderOptionParameters<TValue> & {
  group: SelectOptionGroup<TValue>;
};

export function renderOption<TValue extends {}>(parameters: RenderOptionParameters<TValue>) {
  const {
    option,
    getOptionState,
    getOptionProps,
    listboxOption: ListboxOption,
    componentsProps,
    ownerState,
    optionClassName,
  } = parameters;

  if (isOptionGroup(option)) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return renderGroup({
      ...parameters,
      group: option,
    });
  }

  const optionState = getOptionState(option.index);
  const { disabled: optionDisabled, highlighted, selected } = optionState;
  const optionClasses = clsx(optionClassName, [
    componentsProps.listboxOption?.className,
    optionDisabled && selectUnstyledClasses.disabled,
    highlighted && selectUnstyledClasses.highlighted,
    selected && selectUnstyledClasses.selected,
  ]);

  const optionProps = appendOwnerState(
    ListboxOption,
    {
      ...componentsProps.listboxRoot,
      ...getOptionProps(option.index),
      className: optionClasses,
    },
    { ...ownerState, ...optionState },
  );

  return (
    <ListboxOption key={option.value.toString()} {...optionProps}>
      {option.label}
    </ListboxOption>
  );
}

function renderGroup<TValue>(parameters: RenderGroupParameters<TValue>) {
  const {
    group,
    componentsProps,
    ownerState,
    listboxOptionGroupRoot: ListboxOptionGroupRoot,
    listboxOptionGroupHeader: ListboxOptionGroupHeader,
    listboxOptionGroupOptions: ListboxOptionGroupOptions,
    itemIndex,
  } = parameters;

  const rootClasses = clsx(
    selectUnstyledClasses.groupRoot,
    group.disabled && selectUnstyledClasses.disabled,
    componentsProps.listboxOptionGroupRoot?.className,
  );
  const headerClasses = clsx(
    selectUnstyledClasses.groupHeader,
    componentsProps.listboxOptionGroupHeader?.className,
  );
  const optionsClasses = clsx(
    selectUnstyledClasses.groupOptions,
    componentsProps.listboxOptionGroupOptions?.className,
  );

  const rootProps = appendOwnerState(
    ListboxOptionGroupRoot,
    {
      ...componentsProps.listboxOptionGroupRoot,
      className: rootClasses,
    },
    { ...ownerState, ...group },
  );

  const headerProps = appendOwnerState(
    ListboxOptionGroupHeader,
    {
      ...componentsProps.listboxOptionGroupRoot,
      className: headerClasses,
    },
    { ...ownerState, ...group },
  );

  const optionsProps = appendOwnerState(
    ListboxOptionGroupOptions,
    {
      ...componentsProps.listboxOptionGroupRoot,
      className: optionsClasses,
    },
    { ...ownerState, ...group },
  );

  return (
    <ListboxOptionGroupRoot key={`group-${itemIndex}`} {...rootProps}>
      <ListboxOptionGroupHeader {...headerProps}>{group.label}</ListboxOptionGroupHeader>
      <ListboxOptionGroupOptions {...optionsProps}>
        {group.options.map((option, index) =>
          renderOption({ ...parameters, option, itemIndex: index }),
        )}
      </ListboxOptionGroupOptions>
    </ListboxOptionGroupRoot>
  );
}
