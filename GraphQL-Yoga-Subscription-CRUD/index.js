const { createServer, createPubSub, withFilter } = require("graphql-yoga");
const { events, users, participants, locations } = require("./data.json");
const { uuid } = require("uuidv4");

const pubsub = createPubSub();

const typeDefs = `
  ## // ! Event
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    to: String!
    location_id: Int!
    user_id: ID!
    users: [User!]!
    participants: [Participant!]!
    locations: [Location!]!
  }
  input CreateEventInput {
    title: String!
    desc: String!
    date: String!
    to: String!
    location_id: Int!
    user_id: ID!
  }
  input UpdateEventInput {
    title: String!
    desc: String!
    date: String!
    to: String!
    location_id: Int!
    user_id: ID!
  }
  type DeleteAllOutput {
    count: Int!
  }

  ## // ! User
  type User {
    id: ID!
    username: String!
    email: String!
  }
  input CreateUserInput {
    username: String!
    email: String!
  }
  input UpdateUserInput {
    username: String!
    email: String!
  }

  ## // ! Participant
  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
  }
  input CreateParticipantInput {
    user_id: ID!
    event_id: ID!
  }
  input UpdateParticipantInput {
    user_id: ID!
    event_id: ID!
  }

  ## // ! Location
  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  input CreateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  input UpdateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  ## // ! Query
  type Query {
    events: [Event!]!
    event(id: ID!): Event!

    users: [User!]!
    user(id: ID!): User!

    participants: [Participant!]!
    participant(id: ID!): Participant!

    locations: [Location!]!
    location(id: ID!): Location!
  }

  ## // ! Mutation

  type Mutation {
    ## // ! Event
    createEvent(data: CreateEventInput!): Event!
    updateEvent(id: ID!, data: UpdateEventInput!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvents: DeleteAllOutput!

    ## // ! User
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAllOutput!

    ## // ! Participant
    createParticipant(data: CreateParticipantInput!): Participant!
    updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipant: DeleteAllOutput!

    ## // ! Location
    createLocation(data: CreateLocationInput!): Location!
    updateLocation(id: ID!, data: UpdateLocationInput): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocation: DeleteAllOutput!

  }

  ## // ! Event

  type Subscription {
    eventCreated: Event!
    eventUpdated: Event!
    eventDeleted: Event!

    ## // ! User

    userCreated: User!
    userUpdated: User!
    userDeleted: User!

    ## // ! Participant

    participantCreated: Participant!
    participantUpdated: Participant!
    participantDeleted: Participant!

    ## // ! Location

    locationCreated: Location!
    locationUpdated: Location!
    locationDeleted: Location!
  }
`;

// ! const resolvers

const resolvers = {
  // ! Query
  Query: {
    // ! Events
    events: () => events,
    event: (parent, args) =>
      events.find((event) => event.id === parseInt(args.id)),
    // ! Users
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === parseInt(args.id)),
    // ! Participants
    participants: () => participants,
    participant: (parent, args) =>
      participants.find((participant) => participant.id === parseInt(args.id)),
    // ! Locations
    locations: () => locations,
    location: (parent, args) =>
      locations.find((location) => location.id === parseInt(args.id)),
  },
  // ! Event
  Event: {
    // ! users
    users: (parent, args) =>
      users.filter((user) => user.id === parseInt(parent.id)),
    // ! participants
    participants: (parent, args) =>
      participants.filter(
        (participant) => participant.id === parseInt(parent.id)
      ),
    // ! locations
    locations: (parent, args) =>
      locations.filter((location) => location.id === parseInt(parent.id)),
  },
  // ! Mutation
  Mutation: {
    // ! Event
    createEvent: (parent, { data }) => {
      const event = { id: uuid(), ...data };
      events.push(event);
      pubsub.publish("eventCreated", event); // ! Subscription
      return event;
    },
    updateEvent: (parent, { id, data }) => {
      const event_index = events.findIndex(
        (event) => event.id === parseInt(id)
      );
      if (event_index === -1) {
        throw new Error("User not found");
      }
      const update_Event = (events[event_index] = {
        ...events[event_index],
        ...data,
      });
      pubsub.publish("eventUpdated", update_Event); // ! Subscription
      return update_Event;
    },
    deleteEvent: (parent, { id }) => {
      const event_index = events.findIndex(
        (event) => event.id === parseInt(id)
      );
      if (event_index === -1) {
        throw new Error("Event not Found");
      }
      const deletedEvent = events[event_index];
      events.splice(event_index, 1);
      pubsub.publish("eventDeleted", deletedEvent); // ! Subscription
      return deletedEvent;
    },
    deleteAllEvents: () => {
      const length = events.length;
      events.splice(0, length);

      return {
        count: length,
      };
    },

    // ! User
    createUser: (parent, { data }) => {
      const user = { id: uuid(), ...data };
      users.push(user);
      pubsub.publish("userCreated", user); // ! Subscription
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id === parseInt(id));
      if (user_index === -1) {
        throw new Error("User not found");
      }
      const update_User = (users[user_index] = {
        ...users[user_index],
        ...data,
      });
      pubsub.publish("userUpdated", update_User); // ! Subscription
      return update_User;
    },
    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id === parseInt(id));
      if (user_index === -1) {
        throw new Error("Event not Found");
      }
      const deletedUser = users[user_index];
      users.splice(user_index, 1);
      pubsub.publish("userDeleted", deletedUser); // ! Subscription
      return deletedUser;
    },
    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);

      return {
        count: length,
      };
    },

    // ! Participant
    createParticipant: (parent, { data }) => {
      const participant = {
        id: uuid(),
        ...data,
      };
      participants.push(participant);
      pubsub.publish("participantCreated", participant); // ! Subscription
      return participant;
    },
    updateParticipant: (parent, { id, data }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id === parseInt(id)
      );
      if (participant_index === -1) {
        throw new Error("User not found");
      }
      const update_Participant = (participants[participant_index] = {
        ...participants[participant_index],
        ...data,
      });
      pubsub.publish("participantUpdated", update_Participant); // ! Subscription
      return update_Participant;
    },
    deleteParticipant: (parent, { id }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id === parseInt(id)
      );
      if (participant_index === -1) {
        throw new Error("Event not Found");
      }
      const deletedParticipant = participants[participant_index];
      participants.splice(participant_index, 1);
      pubsub.publish("participantDeleted", deletedParticipant); // ! Subscription
      return deletedParticipant;
    },
    deleteAllParticipant: () => {
      const length = participants.length;
      participants.splice(0, length);

      return {
        count: length,
      };
    },

    // ! Location
    createLocation: (parent, { data }) => {
      const location = { id: uuid(), ...data };
      locations.push(location);
      pubsub.publish("locationCreated", location); // ! Subscription
      return location;
    },
    updateLocation: (parent, { id, data }) => {
      const location_index = locations.findIndex(
        (location) => location.id === parseInt(id)
      );
      if (location_index === -1) {
        throw new Error("User not found");
      }
      const update_Location = (locations[location_index] = {
        ...locations[location_index],
        ...data,
      });
      pubsub.publish("locationUpdated", update_Location); // ! Subscription
      return update_Location;
    },
    deleteLocation: (parent, { id }) => {
      const location_index = locations.findIndex(
        (location) => location.id === parseInt(id)
      );
      if (location_index === -1) {
        throw new Error("Event not Found");
      }
      const deletedLocation = locations[location_index];
      locations.splice(location_index, 1);
      pubsub.publish("locationDeleted", deletedLocation); // ! Subscription
      return deletedLocation;
    },
    deleteAllLocation: () => {
      const length = locations.length;
      locations.splice(0, length);

      return {
        count: length,
      };
    },
  },

  // ! Subscription

  Subscription: {
    // ! Event

    eventCreated: {
      subscribe: () => pubsub.subscribe("eventCreated"),
      resolve: (payload) => payload,
    },
    eventUpdated: {
      subscribe: () => pubsub.subscribe("eventUpdated"),
      resolve: (payload) => payload,
    },
    eventDeleted: {
      subscribe: () => pubsub.subscribe("eventDeleted"),
      resolve: (payload) => payload,
    },
    // ! User

    userCreated: {
      subscribe: () => pubsub.subscribe("userCreated"),
      resolve: (payload) => payload,
    },
    userUpdated: {
      subscribe: () => pubsub.subscribe("userUpdated"),
      resolve: (payload) => payload,
    },
    userDeleted: {
      subscribe: () => pubsub.subscribe("userDeleted"),
      resolve: (payload) => payload,
    },

    // ! Participant

    participantCreated: {
      subscribe: () => pubsub.subscribe("participantCreated"),
      resolve: (payload) => payload,
    },
    participantUpdated: {
      subscribe: () => pubsub.subscribe("participantUpdated"),
      resolve: (payload) => payload,
    },
    participantDeleted: {
      subscribe: () => pubsub.subscribe("participantDeleted"),
      resolve: (payload) => payload,
    },

    // ! Location

    locationCreated: {
      subscribe: () => pubsub.subscribe("locationCreated"),
      resolve: (payload) => payload,
    },
    locationUpdated: {
      subscribe: () => pubsub.subscribe("locationUpdated"),
      resolve: (payload) => payload,
    },
    locationDeleted: {
      subscribe: () => pubsub.subscribe("locationDeleted"),
      resolve: (payload) => payload,
    },
  },
};

const server = createServer({
  schema: {
    typeDefs: typeDefs,
    resolvers: resolvers,
  },
});

server.start();
