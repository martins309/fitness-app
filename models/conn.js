const host = 'ziggy.db.elephantsql.com',
    database = 'envbzadl',
    user = 'envbzadl',
    password = '2k588JoBHSe94DSPObSWkc9bHDewgIHD';

const pgp = require('pg-promise')({
    query: function(e) {
    console.log('QUERY:', e.query);
    }
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password
};

const db = pgp(options);

module.exports = db;