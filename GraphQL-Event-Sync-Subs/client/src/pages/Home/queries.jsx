import { gql } from '@apollo/client';

// Fragment
const eventsFragment = gql`
  fragment EventsFragment on Event {
    _id
    title
    desc
  }
`;

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      ...EventsFragment
    }
  }
  ${eventsFragment}
`;

export const EVENTS_SUBS = gql`
  subscription {
    eventCreated {
      ...EventsFragment
    }
  }
  ${eventsFragment}
`;
