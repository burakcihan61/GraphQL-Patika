import { gql } from '@apollo/client';

export const GET_COUNT = gql`
  subscription {
    eventCount
  }
`;
