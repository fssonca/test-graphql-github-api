import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {IData, IEnhancedTableProps, IHeadCell} from '../types';
import '../App.css';

const headCells: IHeadCell[] = [
  {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
  {id: 'stargazerCount', numeric: true, disablePadding: false, label: 'Stars'},
  {id: 'forkCount', numeric: true, disablePadding: false, label: 'Forks'},
];

const TableHeader = (props: IEnhancedTableProps) => {
  const {classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell: IHeadCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <div className="table-cell">
                <span className={classes.boldText}>{headCell.label}</span>
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </div>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
