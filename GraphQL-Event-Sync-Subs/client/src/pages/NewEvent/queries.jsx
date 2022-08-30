import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      _id
      username
    }
  }
`;

export const GET_LOCATIONS = gql`
  query {
    locations {
      _id
      name
    }
  }
`;

export const NEW_EVENT = gql`
  mutation createEvent($data: createEvent!) {
    createEvent(data: $data) {
      _id
      title
    }
  }
`;
