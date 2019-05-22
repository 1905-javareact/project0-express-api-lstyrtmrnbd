import { PoolClient } from 'pg'

import { connectionPool } from "./db-connection";

export { queryParams }

async function queryParams(query: string, ...rest) {

    let client: PoolClient;

    try {

        client = await connectionPool.connect();
        const result = await client.query(query, rest);
        return result.rows;

    } catch (err) {

        console.log(err);
        return null;

    } finally {

        client && client.release();
    }
}
