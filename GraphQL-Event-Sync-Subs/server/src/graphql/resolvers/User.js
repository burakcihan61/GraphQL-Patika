const User = {
  events: async (parent, __, { db }) => await db.Event.find({ user: parent._id }),
};

module.exports.User = User;
