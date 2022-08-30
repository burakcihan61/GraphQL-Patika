import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      _id
      title
      desc
      date
      from
      to
      location {
        name
        desc
      }
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      _id
      username
    }
  }
`;

// Fragment
const participantsFragment = gql`
  fragment ParticipantsFragment on Participant {
    user {
      username
      email
    }
  }
`;

export const GET_PARTICIPANTS = gql`
  query ($id: ID!) {
    event(id: $id) {
      participants {
        ...ParticipantsFragment
      }
    }
  }
  ${participantsFragment}
`;

export const PARTICIPANTS_SUBS = gql`
  subscription participantCreated($id: ID) {
    participantCreated(event: $id) {
      ...ParticipantsFragment
    }
  }
  ${participantsFragment}
`;

export const NEW_PARTICIPANT = gql`
  mutation createParticipant($data: createParticipant!) {
    createParticipant(data: $data) {
      _id
    }
  }
`;
