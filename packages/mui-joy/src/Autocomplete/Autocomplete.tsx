import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/base/composeClasses';
import { useAutocomplete, AutocompleteGroupedOption } from '@mui/base/AutocompleteUnstyled';
import PopperUnstyled, { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { useSlotProps } from '@mui/base/utils';
import { useThemeProps } from '../styles';
import ClearIcon from '../internal/svg-icons/Close';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import styled from '../styles/styled';
// slot components
import { IconButtonRoot } from '../IconButton/IconButton';
import { ListRoot } from '../List/List';
import { ListItemButtonRoot } from '../ListItemButton/ListItemButton';
// default render components
import Chip, { chipClasses } from '../Chip';
import { IconButtonOwnerState } from '../IconButton';
import Input, { inputClasses } from '../Input';
import List, { listClasses } from '../List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import ListSubheader from '../ListSubheader';
import ListItem, { listItemClasses } from '../ListItem';
import autocompleteClasses, { getAutocompleteUtilityClass } from './autocompleteClasses';
import {
  AutocompleteProps,
  AutocompleteRenderGroupParams,
  AutocompleteRenderGetTagProps,
  AutocompleteOwnerState,
} from './AutocompleteProps';
import FormControlContext from '../FormControl/FormControlContext';

type OwnerState = Omit<AutocompleteOwnerState<any, any, any, any>, 'onChange'>;

const defaultIsActiveElementInListbox = (listboxRef: React.RefObject<HTMLElement>) =>
  listboxRef.current !== null && listboxRef.current.contains(document.activeElement);
const defaultGetOptionLabel = <T extends unknown>(option: T) =>
  (option as { label: string }).label ?? option;
const defaultLimitTagsText = (more: string | number) => `+${more}`;
const defaultRenderInput = (params: any) => <Input {...params} />;
const defaultRenderGroup = (params: AutocompleteRenderGroupParams) => (
  <ListItem key={params.key} nested>
    <ListSubheader sticky>{params.group}</ListSubheader>
    <List>{params.children}</List>
  </ListItem>
);

const useUtilityClasses = (ownerState: OwnerState) => {
  const { focused, fullWidth, hasClearIcon, hasPopupIcon, popupOpen } = ownerState;

  const slots = {
    root: [
      'root',
      focused && 'focused',
      fullWidth && 'fullWidth',
      hasClearIcon && 'hasClearIcon',
      hasPopupIcon && 'hasPopupIcon',
    ],
    clearIndicator: ['clearIndicator'],
    popupIndicator: ['popupIndicator', popupOpen && 'popupIndicatorOpen'],
    listbox: ['listbox'],
    loading: ['loading'],
    noOptions: ['noOptions'],
    option: ['option'],
    tag: ['tag'],
  };

  return composeClasses(slots, getAutocompleteUtilityClass, {});
};

const AutocompleteRoot = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: OwnerState }>(({ ownerState }) => {
  let endDecoratorCount = 0;
  if (ownerState.hasClearIcon) {
    endDecoratorCount += 1;
  }
  if (ownerState.hasPopupIcon) {
    endDecoratorCount += 1;
  }
  return [
    {
      ...(ownerState.fullWidth && {
        width: '100%',
      }),
      /* Avoid double tap issue on iOS */
      '@media (pointer: fine)': {
        [`&:hover .${autocompleteClasses.clearIndicator}`]: {
          visibility: 'visible',
        },
      },
      [`& .${inputClasses.root}`]: {
        paddingInlineEnd: `calc(${endDecoratorCount} * var(--Input-decorator-childHeight) + 2 * var(--_Input-paddingBlock))`,
      },
      [`& .${inputClasses.input}`]: {
        minWidth: 30,
        minHeight: 'calc(var(--Input-minHeight) - 2 * var(--variant-borderWidth, 0px))',
      },
      [`& .${inputClasses.endDecorator}`]: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 'var(--Input-paddingInline)',
      },
    },
    ownerState.multiple && {
      [`& .${inputClasses.root}`]: {
        flexWrap: 'wrap',
        paddingInlineStart: 0,
        paddingBlockEnd: 'var(--_Input-paddingBlock)',
      },
      [`& .${inputClasses.startDecorator}`]: {
        display: 'contents',
      },
      [`& .${inputClasses.input}`]: {
        marginInlineStart: 'var(--Input-paddingInline)',
        marginBlockEnd: 'calc(-1 * var(--_Input-paddingBlock))',
      },
      [`& .${chipClasses.root}`]: {
        // TODO: use flexbox `gap` on the root slot later.
        marginInlineStart: 'var(--_Input-paddingBlock)',
        marginBlockStart: 'var(--_Input-paddingBlock)',
      },
    },
  ];
});

const AutocompleteClearIndicator = styled(IconButtonRoot, {
  name: 'JoyAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: (props, styles) => styles.clearIndicator,
})<{ ownerState: OwnerState & IconButtonOwnerState }>(({ ownerState }) => ({
  marginInlineEnd: 0, // prevent the automatic adjustment between Input and IconButtonRoot
  visibility: ownerState.focused ? 'visible' : 'hidden',
}));

const AutocompletePopupIndicator = styled(IconButtonRoot, {
  name: 'JoyAutocomplete',
  slot: 'PopupIndicator',
  overridesResolver: (props, styles) => styles.popupIndicator,
})<{ ownerState: OwnerState & IconButtonOwnerState }>(({ ownerState }) => ({
  ...(ownerState.popupOpen && {
    transform: 'rotate(180deg)',
  }),
}));

const AutocompleteListbox = styled(ListRoot, {
  name: 'JoyAutocomplete',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})<{ ownerState: OwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--_outline-inside': '1', // to prevent the focus outline from being cut by overflow
    '--List-radius': theme.vars.radius.sm,
    '--List-item-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.surface,
    '--List-item-stickyTop': 'calc(var(--List-padding, var(--List-divider-gap)) * -1)',
    ...scopedVariables,
    boxShadow: theme.vars.shadow.md,
    ...(!variantStyle?.backgroundColor && {
      backgroundColor: theme.vars.palette.background.surface,
    }),
    zIndex: 1200,
    overflow: 'auto',
    maxHeight: '40vh',
    position: 'relative', // to make sure that the listbox is positioned for grouped options to work.
    [`& .${listItemClasses.nested}, & .${listItemClasses.nested} .${listClasses.root}`]: {
      // For grouped options autocomplete:
      // Force the position to make the scroll into view logic works because the `element.offsetTop` should reference to the listbox, not the grouped list.
      // See the implementation of the `useAutocomplete` line:370
      //
      // Resource: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
      position: 'initial',
    },
  };
});

const AutocompleteLoading = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'Loading',
  overridesResolver: (props, styles) => styles.loading,
})<{ ownerState: OwnerState }>(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  padding: '14px 16px',
}));

const AutocompleteNoOptions = styled('div', {
  name: 'JoyAutocomplete',
  slot: 'NoOptions',
  overridesResolver: (props, styles) => styles.noOptions,
})<{ ownerState: OwnerState }>(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  padding: '14px 16px',
}));

const AutocompleteOption = styled(ListItemButtonRoot, {
  name: 'JoyAutocomplete',
  slot: 'Option',
  overridesResolver: (props, styles) => styles.option,
})<{ ownerState: OwnerState }>(({ theme, ownerState }) => ({
  '&[aria-disabled="true"]': theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  '&[aria-selected="true"]': {
    color: theme.vars.palette.primary.softColor,
    backgroundColor: theme.vars.palette.primary.softBg,
    fontWeight: theme.vars.fontWeight.md,
  },
}));

const Autocomplete = React.forwardRef(function Autocomplete(
  inProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoyAutocomplete',
  });

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    className,
    clearIcon = <ClearIcon fontSize="md" />,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    clearText = 'Clear',
    closeText = 'Close',
    componentsProps = {},
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    disablePortal = false,
    filterOptions,
    filterSelectedOptions = false,
    forcePopupIcon = 'auto',
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = defaultLimitTagsText,
    getOptionDisabled,
    getOptionLabel = defaultGetOptionLabel,
    isOptionEqualToValue,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    includeInputInList = false,
    inputValue: inputValueProp,
    limitTags = -1,
    loading = false,
    loadingText = 'Loading…',
    multiple = false,
    noOptionsText = 'No options',
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open,
    openOnFocus = false,
    openText = 'Open',
    options,
    popupIcon = <ArrowDropDownIcon />,
    readOnly = false,
    renderGroup = defaultRenderGroup,
    renderInput = defaultRenderInput,
    renderOption: renderOptionProp,
    renderTags,
    selectOnFocus = !props.freeSolo,
    size = 'md',
    value: valueProp,
    ...other
  } = props;

  const formControl = React.useContext(FormControlContext);

  const {
    id,
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions,
  } = useAutocomplete({
    ...props,
    id: formControl?.htmlFor,
    componentName: 'Autocomplete',
    classNamePrefix: 'Joy',
    _isActiveElementInListbox: defaultIsActiveElementInListbox,
  });

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

  // If you modify this, make sure to keep the `AutocompleteOwnerState` type in sync.
  const ownerState = {
    ...props,
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen,
    size,
  } as OwnerState;

  const classes = useUtilityClasses(ownerState);

  let startDecorator;

  if (multiple && (value as Array<unknown>).length > 0) {
    const getCustomizedTagProps: AutocompleteRenderGetTagProps = (params) => ({
      className: classes.tag,
      disabled,
      size,
      ...getTagProps(params),
    });

    if (renderTags) {
      startDecorator = renderTags(value as Array<unknown>, getCustomizedTagProps, ownerState);
    } else {
      startDecorator = (value as Array<unknown>).map((option, index) => {
        const { onDelete, ...tagProps } = getCustomizedTagProps({ index });
        return (
          <Chip size={size} variant="soft" color="neutral" {...tagProps}>
            {getOptionLabel(option)}
          </Chip>
        );
      });
    }
  }

  if (limitTags > -1 && Array.isArray(startDecorator)) {
    const more = startDecorator.length - limitTags;
    if (!focused && more > 0) {
      startDecorator = startDecorator.splice(0, limitTags);
      startDecorator.push(
        <span className={classes.tag} key={startDecorator.length}>
          {getLimitTagsText(more)}
        </span>,
      );
    }
  }

  const defaultRenderOption = (
    optionProps: React.HTMLAttributes<HTMLLIElement | HTMLDivElement>,
    option: unknown,
  ) => (
    // Can't use `useSlotProps`
    <AutocompleteOption
      as="li"
      ownerState={{
        ...ownerState,
        variant: 'plain',
        color: 'neutral',
      }}
      {...optionProps}
    >
      {getOptionLabel(option)}
    </AutocompleteOption>
  );
  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option: unknown, index: number) => {
    const optionProps = getOptionProps({ option, index });

    return renderOption({ ...optionProps, className: classes.option }, option, {
      // `aria-selected` prop will always by boolean, see useAutocomplete hook.
      selected: !!optionProps['aria-selected'],
      inputValue,
    });
  };

  // cache the modifiers to prevent Popper from being recreated when React rerenders menu.
  const cachedModifiers = React.useMemo<PopperUnstyledProps['modifiers']>(
    () => [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
      {
        // popper will have the same width as root element when open
        name: 'equalWidth',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
      },
    ],
    [],
  );

  const rootProps = useSlotProps({
    elementType: AutocompleteRoot,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: componentsProps.root,
    ownerState,
    additionalProps: {
      ref,
    },
    className: classes.root,
  });

  const clearIndicatorProps = useSlotProps({
    elementType: AutocompleteClearIndicator,
    getSlotProps: getClearProps as unknown as () => React.HTMLAttributes<HTMLButtonElement>,
    externalSlotProps: componentsProps.clearIndicator,
    className: classes.clearIndicator,
    ownerState: {
      ...ownerState,
      size,
      variant: 'plain',
      color: 'neutral',
    },
    additionalProps: {
      'aria-label': clearText,
      title: clearText,
    },
  });

  const popupIndicatorProps = useSlotProps({
    elementType: AutocompletePopupIndicator,
    getSlotProps:
      getPopupIndicatorProps as unknown as () => React.HTMLAttributes<HTMLButtonElement>,
    externalSlotProps: componentsProps.popupIndicator,
    className: classes.popupIndicator,
    ownerState: {
      ...ownerState,
      size,
      variant: 'plain',
      color: 'neutral',
    },
    additionalProps: {
      disabled,
      'aria-label': popupOpen ? closeText : openText,
      title: popupOpen ? closeText : openText,
    },
  });

  const { component: listboxComponent, ...listboxProps } = useSlotProps({
    elementType: AutocompleteListbox,
    // TODO: fix useSlotProps typings, the `component` should be infered from `externalSlotProps`
    getSlotProps: getListboxProps as () => React.HTMLAttributes<HTMLUListElement> & {
      component?: React.ElementType;
    },
    externalSlotProps: componentsProps.listbox,
    additionalProps: {
      anchorEl,
      disablePortal,
      open: popupOpen,
      modifiers: cachedModifiers,
    },
    ownerState: {
      ...ownerState,
      variant: 'outlined',
      color: 'neutral',
      nesting: false,
      row: false,
      wrap: false,
    },
    className: classes.listbox,
  });

  return (
    <React.Fragment>
      <AutocompleteRoot {...rootProps}>
        {renderInput({
          disabled,
          fullWidth: true,
          size,
          ref: setAnchorEl,
          startDecorator,
          ...((hasClearIcon || hasPopupIcon) && {
            endDecorator: (
              <React.Fragment>
                {hasClearIcon ? (
                  <AutocompleteClearIndicator {...clearIndicatorProps}>
                    {clearIcon}
                  </AutocompleteClearIndicator>
                ) : null}

                {hasPopupIcon ? (
                  <AutocompletePopupIndicator {...popupIndicatorProps}>
                    {popupIcon}
                  </AutocompletePopupIndicator>
                ) : null}
              </React.Fragment>
            ),
          }),
          componentsProps: {
            input: {
              disabled,
              readOnly,
              ...getInputProps(),
            },
          },
        })}
      </AutocompleteRoot>
      {anchorEl ? (
        <PopperUnstyled {...listboxProps} as={listboxComponent} component={AutocompleteListbox}>
          <ListProvider nested>
            {loading && groupedOptions.length === 0 ? (
              <AutocompleteLoading className={classes.loading} ownerState={ownerState}>
                {loadingText}
              </AutocompleteLoading>
            ) : null}
            {groupedOptions.length === 0 && !freeSolo && !loading ? (
              <AutocompleteNoOptions
                className={classes.noOptions}
                ownerState={ownerState}
                role="presentation"
                onMouseDown={(event) => {
                  // Prevent input blur when interacting with the "no options" content
                  event.preventDefault();
                }}
              >
                {noOptionsText}
              </AutocompleteNoOptions>
            ) : null}
            {groupedOptions.map((option, index) => {
              if (groupBy) {
                const typedOption = option as AutocompleteGroupedOption;
                return renderGroup({
                  key: String(typedOption.key),
                  group: typedOption.group,
                  children: typedOption.options.map((option2, index2) =>
                    renderListOption(option2, typedOption.index + index2),
                  ),
                });
              }
              return renderListOption(option, index);
            })}
          </ListProvider>
        </PopperUnstyled>
      ) : null}
    </React.Fragment>
  );
}) as AutocompleteComponent;

interface AutocompleteComponent {
  <
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
  >(
    props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  ): JSX.Element;
  propTypes?: any;
}

Autocomplete.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Autocomplete;
