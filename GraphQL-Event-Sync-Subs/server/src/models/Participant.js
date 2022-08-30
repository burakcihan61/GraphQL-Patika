const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ParticipantSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
});

const Participant = mongoose.model('Participant', ParticipantSchema);

module.exports = Participant;
