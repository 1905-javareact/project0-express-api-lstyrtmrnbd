import { PoolClient } from 'pg'

import { connectionPool } from './db-connection'
import { Reimbursement } from './model';
import { reimbursementToDTO } from './reimbursements-dto';

export { getReimbursementsByStatus, getReimbursementsByUser, getReimbursementById, patchReimbursement }

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

async function getReimbursementById(id: number) {

    let client: PoolClient;

    const queryReimId = `SELECT * FROM reimbrs.reimbursements WHERE reimbrs_id = ${id};`

    try {

        client = await connectionPool.connect();
        const result = await client.query(queryReimId);
        return result.rows;

    } catch (err) {

        console.log(err);
        return null;

    } finally {

        client && client.release();
    }
}

async function patchReimbursement(newReim: Reimbursement) {

    let client: PoolClient;

    const dto = reimbursementToDTO(newReim);
    const updateReim = `UPDATE reimbrs.reimbursements SET author = '${dto.author}', amount = ${dto.amount}, date_submit = ${dto.date_submit}, date_resolve = ${dto.date_resolve}, description = '${dto.description}', resolver = ${dto.resolver}, status_id = ${dto.status_id}, type_id = ${dto.type_id} WHERE reimbrs_id = ${dto.reimbrs_id};`;

    try {

        client = await connectionPool.connect();
        const result = await client.query(updateReim);
        return result;

    } catch (err) {

        console.log(err);
        return null;

    } finally {

        client && client.release();
    }
}
