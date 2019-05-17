import { getAllUsers } from './users-dao'

export { getAllUsersService }

async function getAllUsersService() {

    return await getAllUsers();
}
