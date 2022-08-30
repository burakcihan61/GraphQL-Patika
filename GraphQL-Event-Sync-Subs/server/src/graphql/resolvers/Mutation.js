const Mutation = {
  // Event
  createEvent: async (_, { data }, { pubsub, db }) => {
    const newEvent = new db.Event({ ...data });
    const event = await newEvent.save();
    pubsub.publish('eventCreated', { eventCreated: event });
    const eventCount = await db.Event.countDocuments();
    pubsub.publish('eventCount', { eventCount });
    return event;
  },
  updateEvent: async (_, { id, data }, { pubsub, db }) => {
    const is_event_exist = await db.Event.findById(id);
    if (!is_event_exist) {
      throw new Error('Event not found!');
    }
    const updated_event = await db.Event.findByIdAndUpdate(id, data, { new: true });
    pubsub.publish('eventUpdated', { eventUpdated: updated_event });
    return updated_event;
  },
  deleteEvent: async (_, { id }, { pubsub, db }) => {
    const is_event_exist = await db.Event.findById(id);
    if (!is_event_exist) {
      throw new Error('Event not found!');
    }
    const deleted_event = await db.Event.findByIdAndDelete(id);
    pubsub.publish('eventDeleted', { eventDeleted: deleted_event });
    const eventCount = await db.Event.countDocuments();
    pubsub.publish('eventCount', { eventCount });
    return deleted_event;
  },
  deleteAllEvents: async (_, __, { pubsub, db }) => {
    const deleted_events = await db.Event.deleteMany({});
    pubsub.publish('eventCount', { eventCount: 0 });
    return { count: deleted_events.deletedCount };
  },

  // Location
  createLocation: async (_, { data }, { pubsub, db }) => {
    const newLocation = new db.Location({ ...data });
    const location = await newLocation.save();
    pubsub.publish('locationCreated', { locationCreated: location });
    const locationCount = await db.Location.countDocuments();
    pubsub.publish('locationCount', { locationCount });
    return location;
  },
  updateLocation: async (_, { id, data }, { pubsub, db }) => {
    const is_location_exist = await db.Location.findById(id);
    if (!is_location_exist) {
      throw new Error('Location not found!');
    }
    const updated_location = await db.Location.findByIdAndUpdate(id, data, { new: true });
    pubsub.publish('locationUpdated', { locationUpdated: updated_location });
    return updated_location;
  },
  deleteLocation: async (_, { id }, { pubsub, db }) => {
    const is_location_exist = await db.Location.findById(id);
    if (!is_location_exist) {
      throw new Error('Location not found!');
    }
    const deleted_location = await db.Location.findByIdAndDelete(id);
    pubsub.publish('locationDeleted', { locationDeleted: deleted_location });
    const locationCount = await db.Location.countDocuments();
    pubsub.publish('locationCount', { locationCount });
    return deleted_location;
  },
  deleteAllLocations: async (_, __, { pubsub, db }) => {
    const deleted_locations = await db.Location.deleteMany({});
    pubsub.publish('locationCount', { locationCount: 0 });
    return { count: deleted_locations.deletedCount };
  },

  // User
  createUser: async (_, { data }, { pubsub, db }) => {
    const newUser = new db.User({ ...data });
    const user = await newUser.save();
    pubsub.publish('userCreated', { userCreated: user });
    const userCount = await db.User.countDocuments();
    pubsub.publish('userCount', { userCount });
    return user;
  },
  updateUser: async (_, { id, data }, { pubsub, db }) => {
    const is_user_exist = await db.User.findById(id);
    if (!is_user_exist) {
      throw new Error('User not found!');
    }
    const updated_user = await db.User.findByIdAndUpdate(id, data, { new: true });
    pubsub.publish('userUpdated', { userUpdated: updated_user });
    return updated_user;
  },
  deleteUser: async (_, { id }, { pubsub, db }) => {
    const is_user_exist = await db.User.findById(id);
    if (!is_user_exist) {
      throw new Error('User not found!');
    }
    const deleted_user = await db.User.findByIdAndDelete(id);
    pubsub.publish('userDeleted', { userDeleted: deleted_user });
    const userCount = await db.User.countDocuments();
    pubsub.publish('userCount', { userCount });
    return deleted_user;
  },
  deleteAllUsers: async (_, __, { pubsub, db }) => {
    const deleted_users = await db.User.deleteMany({});
    pubsub.publish('userCount', { userCount: 0 });
    return { count: deleted_users.deletedCount };
  },

  // Participant
  createParticipant: async (_, { data }, { pubsub, db }) => {
    const newParticipant = new db.Participant({ ...data });
    const participant = await newParticipant.save();
    pubsub.publish('participantCreated', { participantCreated: participant });
    const participantCount = await db.Participant.countDocuments();
    pubsub.publish('participantCount', { participantCount });
    return participant;
  },
  updateParticipant: async (_, { id, data }, { pubsub, db }) => {
    const is_participant_exist = await db.Participant.findById(id);
    if (!is_participant_exist) {
      throw new Error('Participant not found!');
    }
    const updated_participant = await db.Participant.findByIdAndUpdate(id, data, { new: true });
    pubsub.publish('participantUpdated', { participantUpdated: updated_participant });
    return updated_participant;
  },
  deleteParticipant: async (_, { id }, { pubsub, db }) => {
    const is_participant_exist = await db.Participant.findById(id);
    if (!is_participant_exist) {
      throw new Error('Participant not found!');
    }
    const deleted_participant = await db.Participant.findByIdAndDelete(id);
    pubsub.publish('participantDeleted', { participantDeleted: deleted_participant });
    const participantCount = await db.Participant.countDocuments();
    pubsub.publish('participantCount', { participantCount });
    return deleted_participant;
  },
  deleteAllParticipants: async (_, __, { pubsub, db }) => {
    const deleted_participants = await db.Participant.deleteMany({});
    pubsub.publish('participantCount', { participantCount: 0 });
    return { count: deleted_participants.deletedCount };
  },
};

module.exports.Mutation = Mutation;
