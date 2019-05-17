import { PoolClient } from 'pg'

import { connectionPool } from './db-connection'

export { getAllUsers }

const queryAllUsers = 'SELECT * FROM reimbrs.users;'

async function getAllUsers() {

    let client: PoolClient

    try {

        client = await connectionPool.connect();
        const result = await client.query(queryAllUsers);
        return result.rows;

    } catch (err) {

        console.log(err);
        return null;

    } finally {

        client && client.release();
    }
}
