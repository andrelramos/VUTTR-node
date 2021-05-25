const mongoose = require('mongoose');

beforeEach('test hooks', (done) => {
  /* Connect to the DB before each test */
  mongoose.connect(process.env.MONGO_URI, () => {
    /* Drop the DB */
    mongoose.connection.db.dropDatabase();
    done();
  });
});
