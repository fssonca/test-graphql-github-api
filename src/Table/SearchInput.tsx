import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import {ISearchInput} from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: 400,
      height: 40,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

const SearchInput = (params: ISearchInput) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        startAdornment={
          <InputAdornment position="start">
            {params.loading ? <CircularProgress size={20} /> : <SearchIcon />}
          </InputAdornment>
        }
        data-testid="search-input"
        placeholder="Search repositories..."
        inputProps={{'aria-label': 'search repositories in Github'}}
        defaultValue={params.txtQuery}
        onChange={params.handleSearchInput}
        onKeyPress={(ev)=>{
          if (ev.key === 'Enter') {
            ev.preventDefault();
          }
        }}
      />
    </Paper>
  );
};

export default SearchInput;
