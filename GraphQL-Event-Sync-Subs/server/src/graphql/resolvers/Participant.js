const Participant = {
  user: async (parent, __, { db }) => await db.User.findById(parent.user),
  event: async (parent, __, { db }) => await db.Event.findById(parent.event),
};

module.exports.Participant = Participant;
