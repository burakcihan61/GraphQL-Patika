const Event = {
  location: async (parent, __, { db }) => await db.Location.findById(parent.location),
  user: async (parent, __, { db }) => await db.User.findById(parent.user),
  participants: async (parent, __, { db }) => await db.Participant.find({ event: parent._id }),
};

module.exports.Event = Event;
