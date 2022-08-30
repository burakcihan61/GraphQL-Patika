import { createServer, createPubSub } from "graphql-yoga";
import typeDefs from "./graphql/types/index";
import { uuid } from "uuidv4";
import {
  events,
  users,
  participants,
  locations,
  eventsyncs,
} from "./data.json";

const pubsub = createPubSub();

// ! Resolvers

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

    // ! EventSync
    eventsyncs: () => eventsyncs,
    eventsync: (parent, args) =>
      eventsyncs.find((eventSyncs) => eventSyncs.id === parseInt(args.id)),
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
    // ! eventSyncs
    eventsyncs: (parent, args) =>
      eventsyncs.filter((eventsync) => eventsync.id === parseInt(parent.id)),
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

    // ! EventSync
    createEventSync: (parent, { data }) => {
      const eventsync = { id: uuid(), ...data };
      eventsyncs.push(eventsync);
      return eventsync;
    },
    updateEventSync: (parent, { id, data }) => {
      const EventSync_index = eventsyncs.findIndex(
        (eventsync) => eventsync.id === parseInt(id)
      );
      if (EventSync_index === -1) {
        throw new Error("User not found");
      }
      const update_EventSync = (eventsyncs[EventSync_index] = {
        ...eventsyncs[EventSync_index],
        ...data,
      });
      return update_EventSync;
    },
    deleteEventSync: (parent, { id }) => {
      const EventSync_index = eventsyncs.findIndex(
        (EventSync) => EventSync.id === parseInt(id)
      );
      if (EventSync_index === -1) {
        throw new Error("Event not Found");
      }
      const deletedEventSync = eventsyncs[EventSync_index];
      eventsyncs.splice(EventSync_index, 1);
      return deletedEventSync;
    },
    deleteAllEventSync: () => {
      const length = eventsyncs.length;
      eventsyncs.splice(0, length);

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
