const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
  mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.on('open', () => console.log('MongoDB: Connected!'));
  mongoose.connection.on('err', (e) => console.log('MongoDB: Not Connected!', e));
};
