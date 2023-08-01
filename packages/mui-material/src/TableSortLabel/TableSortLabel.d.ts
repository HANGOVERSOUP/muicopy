import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { TableSortLabelClasses } from './tableSortLabelClasses';

export type TableSortLabelTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'span',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & {
    /**
     * If `true`, the label will have the active styling (should be true for the sorted column).
     * @default false
     */
    active?: boolean;
    /**
     * Label contents, the arrow will be appended automatically.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<TableSortLabelClasses>;
    /**
     * The current sort direction.
     * @default 'asc'
     */
    direction?: 'asc' | 'desc';
    /**
     * Hide sort icon when active is false.
     * @default false
     */
    hideSortIcon?: boolean;
    /**
     * Sort icon to use.
     * @default ArrowDownwardIcon
     */
    IconComponent?: React.JSXElementConstructor<{ className: string }>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: DefaultComponent;
}>;

/**
 * A button based label for placing inside `TableCell` for column sorting.
 *
 * Demos:
 *
 * - [Table](https://mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableSortLabel API](https://mui.com/material-ui/api/table-sort-label/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
declare const TableSortLabel: ExtendButtonBase<TableSortLabelTypeMap>;

export type TableSortLabelProps<
  RootComponent extends React.ElementType = TableSortLabelTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableSortLabelTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default TableSortLabel;
