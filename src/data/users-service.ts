import { getAllUsers, getUserById, getUserByUsername, patchUser } from './users-dao'
import { userFromDTO } from './users-dto';
import { User } from './model';

export { getAllUsersService, getUserByIdService, getUserByUsernameService, patchUserService }

async function getAllUsersService() {

    const result = await getAllUsers();
    return result.map(userFromDTO);
}

async function getUserByIdService(id: number) {

    const sanitary = !isNaN(id);
    const result = sanitary ? await getUserById(id) : [];

    return result.map(userFromDTO);
}

async function getUserByUsernameService(name: string) {

    // sanitize by checking for spaces
    const result = await getUserByUsername(name);

    return result.map(userFromDTO);
}

// newUser is a User-like object, containing at least an id
async function patchUserService(newUser) {

    const oldUsers = await getUserByIdService(newUser.userId);

    if (oldUsers.length === 0) {

        return false;
    } else {

        const oldUser: User = oldUsers[0];

        for (let field in newUser) {
            oldUser[field] = oldUser[field] && newUser[field];
        }

        // the actual db update
        const patch = await patchUser(oldUser);

        return patch ? oldUser : false;
    }
}
