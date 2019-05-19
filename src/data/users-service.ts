import { getAllUsers, getUserById } from './users-dao'
import { userFromDTO } from './users-dto';

export { getAllUsersService, getUserByIdService }

async function getAllUsersService() {

    const result = await getAllUsers();
    return result.map(userFromDTO);
}

async function getUserByIdService(id: number) {

    const sanitary = !isNaN(id);
    const result = sanitary ? await getUserById(id) : [];

    return result.map(userFromDTO);
}
