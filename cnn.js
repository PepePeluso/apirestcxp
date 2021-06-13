const pgPromise = require("pg-promise")

const config = {
    host: 'bddcxpad.postgres.database.azure.com',
    port: '5432',
    database: 'cxp',
    user: 'cuentasporpagar@bddcxpad',
    password: '@6iDp^M@aGda6zG2Ns9'
}

const pgp = pgPromise({})
const db = pgp(config)

exports.db = db;