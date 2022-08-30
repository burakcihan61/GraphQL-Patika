const Query = {
  // Event
  events: async (_, __, { db }) => await db.Event.find().sort({ _id: -1 }),
  event: async (_, args, { db }) => await db.Event.findById(args.id),

  // Location
  locations: async (_, __, { db }) => await db.Location.find(),
  location: async (_, args, { db }) => await db.Location.findById(args.id),

  // Participant
  participants: async (_, __, { db }) => await db.Participant.find(),
  participant: async (_, args, { db }) => await db.Participant.findById(args.id),

  // User
  users: async (_, __, { db }) => await db.User.find(),
  user: async (_, args, { db }) => await db.User.findById(args.id),
};

module.exports.Query = Query;
