const mongoose = require('mongoose');

beforeEach('starts mongodb connection', (done) => {
  /* Connect to the DB before each test */
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, async () => {
    /* Drop the DB */
    if (mongoose.connection.db !== undefined) {
      await mongoose.connection.db.dropDatabase();
    }

    done();
  });
});

afterEach('closes mongodb connection', (done) => {
  mongoose.connection.close();
  done();
});
