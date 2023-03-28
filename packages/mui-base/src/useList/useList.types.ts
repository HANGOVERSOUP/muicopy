import * as React from 'react';
import { Simplify } from '@mui/types';
import { ListAction } from './listActions.types';
import {
  ControllableReducerAction,
  StateChangeCallback,
} from '../utils/useControllableReducer.types';

type ListActionAddOnValueRequiredKeys =
  | 'disabledItemsFocusable'
  | 'disableListWrap'
  | 'focusManagement'
  | 'isItemDisabled'
  | 'itemComparer'
  | 'items'
  | 'itemStringifier'
  | 'orientation'
  | 'selectionLimit';

/**
 * The subset of `UseListParameters` that is passed to the list reducer actions.
 */
export type ListActionAddOnValue<ItemValue> = Simplify<
  Required<Pick<UseListParameters<ItemValue, any, any>, ListActionAddOnValueRequiredKeys>>
>;

export type ListReducerAction<ItemValue, State extends ListState<ItemValue>> = ListAction<
  ItemValue,
  State
> & {
  props: React.RefObject<ListActionAddOnValue<ItemValue>>;
};

export type ListActionAddOn<ItemValue> = {
  props: React.RefObject<ListActionAddOnValue<ItemValue>>;
};

export interface ListState<ItemValue> {
  /**
   * The item that is currently highlighted.
   */
  highlightedValue: ItemValue | null;
  /**
   * The item(s) that are currently selected.
   */
  selectedValues: ItemValue[];
}

export type ListReducer<ItemValue, State extends ListState<ItemValue>> = (
  state: State,
  action: ListReducerAction<ItemValue, State>,
) => State;

export type FocusManagementType = 'DOM' | 'activeDescendant';

export interface UseListParameters<
  ItemValue,
  State extends ListState<ItemValue> = ListState<ItemValue>,
  CustomAction extends ControllableReducerAction = never,
> {
  /**
   * The externally controlled values (highlighted and selected item(s)) of the list.
   * If a custom state is used, this object can contain the added state fields as well.
   *
   * @default {}
   */
  controlledProps?: Partial<State>;
  /**
   * If `true`, it will be possible to highlight disabled items.
   * @default false
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true`, the highlight will not wrap around the list if arrow keys are used.
   * @default false
   */
  disableListWrap?: boolean;
  /**
   * The focus management strategy used by the list.
   * Controls the attributes used to set focus on the list items.
   */
  focusManagement?: FocusManagementType;
  /**
   * A function that returns the DOM element associated with an item.
   * This is required when using the `DOM` focus management.
   *
   * @param item List item to get the DOM element for.
   */
  getItemDomElement?: (itemValue: ItemValue) => HTMLElement | null;
  /**
   * A function that returns the id of an item.
   * This is required when using the `activeDescendant` focus management.
   *
   * @param itemValue List item to get the id for.
   */
  getItemId?: (itemValue: ItemValue) => string | undefined;
  /**
   * A function that intializes the state of the list.
   * It is required when using a custom state with mandatory fields.
   * If not provided, the state will be initialized with the default values (nothing highlighted or selected).
   *
   * @returns The initial state of the list.
   */
  getInitialState?: () => State;
  /**
   * A function that determines if a particular item is disabled.
   * @default () => false
   */
  isItemDisabled?: (itemValue: ItemValue, index: number) => boolean;
  /**
   * Ref of the list root DOM element.
   */
  listRef?: React.Ref<any>;
  /**
   * Callback fired when the selected value changes.
   * This is a strongly typed convenience event that can be used instead of `onStateChange`.
   */
  onChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: ItemValue[],
    reason: string,
  ) => void;
  /**
   * Callback fired when the highlighted option changes.
   * This is a strongly typed convenience event that can be used instead of `onStateChange`.
   */
  onHighlightChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    option: ItemValue | null,
    reason: string,
  ) => void;
  /**
   * Callback fired when the any of the state items change.
   * Note that in case of `selectedValues` and `highlightedValue` the strongly typed
   * `onChange` and `onHighlightChange` callbacks are also fired.
   */
  onStateChange?: StateChangeCallback<State>;
  /**
   * A function that tests equality between two items' values.
   * @default (a, b) => a === b
   */
  itemComparer?: (itemValue1: ItemValue, itemValue2: ItemValue) => boolean;
  /**
   * A function that converts an object to its string representation
   * @default (o) => o
   */
  itemStringifier?: (option: ItemValue) => string | undefined;
  /**
   * Array of list items.
   */
  items: ItemValue[];
  /**
   * Orientation of the items in the list.
   * Determines the actions that are performed when arrow keys are pressed.
   */
  // TODO: add vertical-reverse
  orientation?: 'horizontal-ltr' | 'horizontal-rtl' | 'vertical';
  /**
   * Maximum number of items that can be selected at once.
   * Set to `null` to disable the limit.
   *
   * @default null
   */
  selectionLimit?: number | null;
  /**
   * Custom state reducer function. It calculates the new state (highlighted and selected items + optional custom state)
   * based on the previous one and the performed action.
   */
  stateReducer?: (
    state: State,
    action: (ListAction<ItemValue, State> | CustomAction) & ListActionAddOn<ItemValue>,
  ) => State;
}

export interface ListItemState {
  /**
   * If `true` the item is disabled.
   */
  disabled: boolean;
  /**
   * Determines if the item is focusable.
   * If `undefined`, focusing doesn't apply as focusManagement is set to 'activeDescendant'.
   */
  focusable: boolean | undefined;
  /**
   * If `true` the item is highlighted.
   */
  highlighted: boolean;
  /**
   * The 0-based index of the item.
   */
  index: number;
  /**
   * If `true` the item is selected.
   */
  selected: boolean;
}

interface UseListRootSlotOwnProps {
  'aria-activedescendant'?: React.AriaAttributes['aria-activedescendant'];
  id?: string;
  onBlur: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  tabIndex: number;
  ref: React.Ref<any>;
}

export type UseListRootSlotProps<TOther = {}> = TOther & UseListRootSlotOwnProps;
