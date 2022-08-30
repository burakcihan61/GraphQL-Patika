const { withFilter } = require('graphql-subscriptions');

const Subscription = {
  // Event
  eventCreated: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator('eventCreated'),
      (payload, variables) => {
        return variables.user ? payload.eventCreated.user === variables.user : true;
      }
    ),
  },
  eventUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('eventUpdated'),
  },
  eventDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('eventDeleted'),
  },
  eventCount: {
    subscribe: async (_, __, { pubsub, db }) => {
      const eventCount = await db.Event.countDocuments();
      setTimeout(() => {
        pubsub.publish('eventCount', { eventCount });
      }, 100);
      return pubsub.asyncIterator('eventCount');
    },
  },

  // Location
  locationCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('locationCreated'),
  },
  locationUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('locationUpdated'),
  },
  locationDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('locationDeleted'),
  },
  locationCount: {
    subscribe: async (_, __, { pubsub, db }) => {
      const locationCount = await db.Location.countDocuments();
      setTimeout(() => {
        pubsub.publish('locationCount', { locationCount });
      }, 100);
      return pubsub.asyncIterator('locationCount');
    },
  },

  // User
  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userCreated'),
  },
  userUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userUpdated'),
  },
  userDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userDeleted'),
  },
  userCount: {
    subscribe: async (_, __, { pubsub, db }) => {
      const userCount = await db.User.countDocuments();
      setTimeout(() => {
        pubsub.publish('userCount', { userCount });
      }, 100);
      return pubsub.asyncIterator('userCount');
    },
  },

  // Participant
  participantCreated: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator('participantCreated'),
      (payload, variables) => {
        return variables.event ? payload.participantCreated.event === variables.event : true;
      }
    ),
  },
  participantUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('participantUpdated'),
  },
  participantDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('participantDeleted'),
  },
  participantCount: {
    subscribe: async (_, __, { pubsub, db }) => {
      const participantCount = await db.Participant.countDocuments();
      setTimeout(() => {
        pubsub.publish('participantCount', { participantCount });
      }, 100);
      return pubsub.asyncIterator('participantCount');
    },
  },
};

module.exports.Subscription = Subscription;
