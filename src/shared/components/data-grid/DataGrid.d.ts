import React from 'react';

type ToolbarProps = {
  data: any[];
  filterName: string;
  module: string;
  numSelected: number;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  refresh: () => void;
  tableHeads: any[];
};

type HeadProps = {
  filtersList: any[];
  headLabel: any[];
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
  processedData: any;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type DataGridProps = {
  actions: any[];
  filtersList?: any[];
  isFetching: boolean;
  module?: string;
  pagination?: any;
  processedData: any;
  refetch: () => void;
  rowsPerPage: number;
  setFiltersList: (filters: any) => void;
  tableHeads: any[];
};

export { DataGridProps, FooterProps, HeadProps, ToolbarProps };
