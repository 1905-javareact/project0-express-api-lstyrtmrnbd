import { getAllUsers, getUserById, getUserByUsername } from './users-dao'
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

    //sanitize by checking for spaces
    const result = await getUserByUsername(name);

    return result.map(userFromDTO);
}

async function patchUserService(user: User) {

}
