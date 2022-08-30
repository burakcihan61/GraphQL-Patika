import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query events {
    events {
      id
      title
      desc
      users {
        profile_photo
      }
    }
  }
`;
