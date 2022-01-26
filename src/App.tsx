import React from 'react';
import './App.css';
import {ApolloProvider} from '@apollo/client';

import {CircularProgress} from '@material-ui/core';

import TableInfo from './Table';
import getDataGithub from './getDataGithub';
import {IQuery} from './types';
import client from './ApolloClientSetup';

const Body = () => {
  const [searchVaribles, setSearchVaribles] = React.useState<IQuery>({
    first: 25,
    after: null,
    before: null,
    last: null,
    query: 'react',
  });
  const [dataFetched, setDataFetched] = React.useState<any>(null);

  const {loading, data, error} = getDataGithub(searchVaribles);

  // watch and define the data fetched in dataFetched, to avoid showing an empty table during the loading on pagination
  React.useEffect(() => {
    if (data) {
      setDataFetched(data);
    }
  }, [data]);

  const fetchData = (params: IQuery) => {
    setSearchVaribles(params);
  };

  if (error) {
    console.log(error);
    return <h1>ERROR</h1>;
  }

  return (
    <div className="App">
      <div className="tableGithub">
        {dataFetched ? (
          <TableInfo fetchData={fetchData} data={dataFetched} loading={loading} />
        ) : (
          <CircularProgress size={40} color="primary" style={{margin: 'auto'}} />
        )}
      </div>
    </div>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <Body />
  </ApolloProvider>
);

export default App;
