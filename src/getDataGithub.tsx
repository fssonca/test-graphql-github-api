import {useQuery, gql} from '@apollo/client';
import {IQuery} from './types';

export const QUERY_GITHUB = gql`
  query ($first: Int, $after: String, $before: String, $last: Int, $query: String!) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after, before: $before, last: $last) {
      repositoryCount
      nodes {
        ... on Repository {
          url
          name
          description
          forkCount
          stargazerCount
        }
      }
      pageInfo {
        startCursor
        endCursor
      }
    }
  }
`;

export default (params: IQuery) => {
  const {loading, data, error} = useQuery(QUERY_GITHUB, {
    variables: params,
  });

  return {loading, data, error};
};
