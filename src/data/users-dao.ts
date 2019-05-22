import { userToDTO } from './users-dto'
import { User } from './model'
import { queryParams } from './dao-common';

export { getAllUsers, getUserById, getUserByUsername, patchUser }

async function getAllUsers() {

    const queryAllUsers = 'SELECT * FROM reimbrs.users;'

    return await queryParams(queryAllUsers);
}

async function getUserById(id: number) {

    const queryUserId = 'SELECT * FROM reimbrs.users WHERE user_id = $1;'

    return await queryParams(queryUserId, id);
}

async function getUserByUsername(name: string) {

    const queryUsername = 'SELECT * FROM reimbrs.users WHERE username = $1;'

    return await queryParams(queryUsername, name);
}

// newUser is a fully populated User object
async function patchUser(newUser: User) {

    const dto = userToDTO(newUser);
    const { username, passwd, first_name,
        last_name, email, role_id, user_id } = dto;

    const updateUser = 'UPDATE reimbrs.users SET username = $1, passwd = $2, first_name = $3, last_name = $4, email = $5, role_id = $6 WHERE user_id = $7;';

    return queryParams(updateUser, username, passwd,
        first_name, last_name, email, role_id, user_id);
}
