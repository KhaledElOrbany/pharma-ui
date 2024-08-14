import React from 'react';

type ToolbarProps = {
  data: any[];
  filterName: string;
  module: string;
  numSelected: number;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  refresh: () => void;
  tableHeaders: any[];
};

type HeadProps = {
  filtersList: any[];
  headers: any[];
  numSelected: number;
  onRequestSort: (property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  setFiltersList: (filters: any[]) => void;
};

type FooterProps = {
  t: any;
  page: number;
  pagination: any;
  rowsPerPage: number;
  rowsCount: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type DataGridProps = {
  data?: any;
  tableMetaData?: any;
  actions: OptionProps[];
  filtersList?: any[];
  isFetching: boolean;
  module?: string;
  pagination?: any;
  refetch: () => void;
  rowsPerPage: number;
  setFiltersList: (filters: any) => void;
};

type OptionProps = {
  name: string;
  color: string;
  sx?: React.CSSProperties;
  icon: string;
  foo: (id: number) => void;
  isDisabled?: boolean;
  disablingElement?: string;
};

export { DataGridProps, FooterProps, HeadProps, ToolbarProps };
