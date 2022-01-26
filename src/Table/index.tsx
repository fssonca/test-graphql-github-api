import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import {getComparator, stableSort} from '../utils/sorterData';
import SearchInput from './SearchInput';
import useStyles from './useStyles';
import {IData, IOrder, ITableGithub} from '../types';
import TableHeader from './TableHeader';
import Starcount from '../components/starcount';
import Forkcount from '../components/forkcount';
import '../App.css';

const TableGithub = (props: ITableGithub) => {
  const {fetchData, data, loading} = props;

  const classes = useStyles();
  const [order, setOrder] = React.useState<IOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IData>('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [txtQuery, setTxtQuery] = React.useState('react');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property); // order by column (name, stars or forks)
  };

  let timeSearch: any = null;

  const handleChangePage = (event: unknown, newPage: number) => {
    const {endCursor, startCursor} = data.search.pageInfo;
    // keys used to pagination

    let after = null;
    let before = null;
    let first = null;
    let last = null;

    if (page < newPage) {
      first = rowsPerPage;
      after = endCursor;
    }

    if (page > newPage) {
      last = rowsPerPage;
      before = startCursor;
    }

    // depending on whether we are going back or forward, we use a different combination of last/before or first/after

    setPage(newPage);
    fetchData({first, after, before, last, query: txtQuery});
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    fetchData({first: value, after: null, before: null, last: null, query: txtQuery});
    // if we change the number of lines per page, we need to call the query again to apply the changes
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const {value} = event.target;

    if (timeSearch) {
      clearTimeout(timeSearch);
      timeSearch = null;
    }

    timeSearch = setTimeout(() => {
      // required to avoid call the API immediately upon keystroke

      setPage(0);
      setTxtQuery(value);
      fetchData({first: rowsPerPage, after: null, before: null, last: null, query: value});
    }, 250);
  };

  return (
    <div className={classes.root}>
      <div className="center-content">
        <SearchInput txtQuery={txtQuery} handleSearchInput={handleSearchInput} loading={loading} />

        {/* format the number of total repositories matched with the query */}
        <h3>{data.search.repositoryCount && `${data.search.repositoryCount.toLocaleString('en-GB')} results`}</h3>

        <p>
          <b data-testid="subtitle-showing-results">Showing results for &quot;{txtQuery}&quot;</b>
        </p>
      </div>

      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <TableHeader
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.search.nodes.length}
            />
            <TableBody>
              {stableSort(data.search.nodes, getComparator(order, orderBy)).map((node: any, index: number) => {
                // stableSort(data.search.nodes, getComparator(order, orderBy)) here we sort the repositores by column value

                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow role="checkbox" tabIndex={-1} key={node.url}>
                    <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                      <div className="table-cell">
                        <Tooltip title={node.description} placement="right-start">
                          <a href={node.url} target="_blank" rel="noreferrer">
                            {node.name}
                          </a>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div className="table-cell">
                        <Starcount stars={node.stargazerCount} />
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div className="table-cell">
                        <Forkcount forkCount={node.forkCount} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="center-content-end">
          <div className="center-content-end square-loading ">{loading && <CircularProgress size={20} />}</div>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data.search.repositoryCount}
            rowsPerPage={rowsPerPage}
            page={page}
            style={{width: 'fit-content'}}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* TablePagination - provided by Material-UI */}
        </div>
      </Paper>
    </div>
  );
};

export default TableGithub;
