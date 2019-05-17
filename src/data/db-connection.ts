import { Pool } from 'pg'

const dbUser = process.env['REIM_API_USERNAME'];
const dbHost = process.env['REIM_API_HOST'];
const dbName = process.env['REIM_API_DBNAME'];
const dbPass = process.env['REIM_API_PASSWORD'];
const dbPort = 5432;
const dbMax = 5;

console.log(`Attempt connection to ${dbName} at ${dbHost}:${dbPort} as ${dbUser}`);

export const connectionPool: Pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPass,
    port: dbPort,
    max: dbMax
});
