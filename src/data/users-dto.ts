
import { User, getRole } from './model'

export { UserDTO, userFromDTO, userToDTO }

class UserDTO {

    user_id: number
    username: string
    passwd: string
    first_name: string
    last_name: string
    email: string
    role_id: number

    constructor(user_id: number, username: string, passwd: string, first_name: string, last_name: string, email: string, role_id: number) {

        this.user_id = user_id;
        this.username = username;
        this.passwd = passwd;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.role_id = role_id;
    }
}

function userFromDTO(dto: UserDTO) {

    const { user_id, username, passwd, first_name, last_name, email, role_id } = dto;
    const role = getRole(role_id);

    return new User(user_id, username, passwd, first_name, last_name, email, role);
}

function userToDTO(user: User) {

    const { userId, username, password, firstName, lastName, email, role } = user;

    return new UserDTO(userId, username, password, firstName, lastName, email, role.roleId);
}
