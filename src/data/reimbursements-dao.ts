import { PoolClient } from 'pg'

import { connectionPool } from './db-connection'

export { getReimbursementsByStatus, getReimbursementsByUser }

async function getReimbursementsByStatus(id: number) {

    let client: PoolClient;

    const queryStatusId = `SELECT * FROM reimbrs.reimbursements WHERE status_id = ${id};`

    try {

        client = await connectionPool.connect();
        const result = await client.query(queryStatusId);
        return result.rows;

    } catch (err) {

        console.log(err);
        return null;

    } finally {

        client && client.release();
    }
}

async function getReimbursementsByUser(id: number) {

    let client: PoolClient;

    const queryUserId = `SELECT * FROM reimbrs.reimbursements WHERE author = ${id};`

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
