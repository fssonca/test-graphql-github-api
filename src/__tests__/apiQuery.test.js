import client from '../ApolloClientSetup';
import {QUERY_GITHUB} from '../getDataGithub';

describe('testing conection to Github API', () => {
  test('query \'react\' and see if return a json with valid results', async () => {
    const queryVariables = {
      first: 10,
      after: null,
      before: null,
      last: null,
      query: 'react',
    };

    const request = await client.query({
      query: QUERY_GITHUB,
      variables: queryVariables,
    });

    expect(request).toBeTruthy();
    expect(request.data.search.nodes).toBeDefined();
  });
});
