before('drop database', (done) => {
    console.log("TESTE CHEGUEI AQUI")
        var mongoose = require('mongoose');
        /* Connect to the DB */
        // TODO get the database url from an env
        mongoose.connect('mongodb://localhost:27017/test', () => {
            /* Drop the DB */
            mongoose.connection.db.dropDatabase();
        });
    done()
});