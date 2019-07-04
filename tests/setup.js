beforeEach('test hooks', (done) => {
    let mongoose = require('mongoose')
    /* Connect to the DB */
    mongoose.connect(process.env.MONGO_URI, () => {
        /* Drop the DB */
        mongoose.connection.db.dropDatabase()
        done()
    })
})