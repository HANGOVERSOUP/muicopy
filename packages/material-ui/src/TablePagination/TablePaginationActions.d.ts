import * as React from 'react';
import { IconButtonProps } from '../IconButton/IconButton';

export interface TablePaginationActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  backIconButtonProps?: Partial<IconButtonProps>;
  count: number;
  nextIconButtonProps?: Partial<IconButtonProps>;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  page: number;
  rowsPerPage: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
}

declare const TablePaginationActions: React.ComponentType<TablePaginationActionsProps>;

export default TablePaginationActions;
