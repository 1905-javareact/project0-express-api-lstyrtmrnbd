import { getAllUsers, getUserById } from './users-dao'

export { getAllUsersService, getUserByIdService }

async function getAllUsersService() {

    return await getAllUsers();
}

async function getUserByIdService(id: number) {

    return await getUserById(id);
}
