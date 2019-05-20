import { PoolClient } from 'pg'

import { connectionPool } from './db-connection'
import { userToDTO } from './users-dto'
import { User } from './model'

export { getAllUsers, getUserById, getUserByUsername, patchUser }

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

async function getUserByUsername(name: string) {

    let client: PoolClient;

    const queryUsername = `SELECT * FROM reimbrs.users WHERE username = '${name}';`

    try {

        client = await connectionPool.connect();
        const result = await client.query(queryUsername);
        return result.rows;

    } catch (err) {

        console.log(err);
        return null;

    } finally {

        client && client.release();
    }
}

// newUser is a fully populated User object
async function patchUser(newUser: User) {

    let client: PoolClient;

    const dto = userToDTO(newUser);
    const updateUser = `UPDATE reimbrs.users SET username = '${dto.username}', passwd = '${dto.passwd}', first_name = '${dto.first_name}', last_name = '${dto.last_name}', email = '${dto.email}', role_id = ${dto.role_id} WHERE user_id = ${dto.user_id};`;

    try {

        client = await connectionPool.connect();
        const result = await client.query(updateUser);
        return result;

    } catch (err) {

        console.log(err);
        return null;

    } finally {

        client && client.release();
    }
}
