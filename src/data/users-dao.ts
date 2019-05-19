import { PoolClient } from 'pg'

import { connectionPool } from './db-connection'

export { getAllUsers, getUserById }

async function getAllUsers() {

    let client: PoolClient;

    const queryAllUsers = 'SELECT * FROM reimbrs.users;'

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

async function getUserById(id: number) {

    let client: PoolClient;

    const queryUserId = `SELECT * FROM reimbrs.users WHERE user_id = ${id};`

    try {

        client = await connectionPool.connect();
        const result = await client.query(queryUserId);
        return result.rows;

    } catch (err) {

        console.log(err);
        return null;

    } finally {

        client && client.release();
    }
}
