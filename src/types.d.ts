import React from 'react';

export interface IEnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void;
  order: IOrder;
  orderBy: string;
  rowCount: number;
}

export interface IData {
  name: string;
  stargazerCount: number;
  forkCount: number;
}

export interface IHeadCell {
  disablePadding: boolean;
  id: keyof IData;
  label: string;
  numeric: boolean;
}

export interface ITableGithub {
  fetchData: (props: IQuery) => void;
  data: any;
  loading: boolean;
}

export type IOrder = 'asc' | 'desc';

export interface IQuery {
  after: string | null;
  before: string | null;
  first: number | null;
  last: number | null;
  query: string;
}

export interface ISearchInput {
  txtQuery: string;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}
