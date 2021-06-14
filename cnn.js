const pgPromise = require("pg-promise")

const config = {
    host: 'be9r11xwpjzo2o4vhbg0-postgresql.services.clever-cloud.com',
    port: '5432',
    database: 'be9r11xwpjzo2o4vhbg0',
    user: 'ulieqq6ghznx3icje31e',
    password: 'GXFAI5JlcSLFCm5HPbWH'
}

const pgp = pgPromise({})
const db = pgp(config)

exports.db = db;