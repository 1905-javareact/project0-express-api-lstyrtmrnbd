import { User, Role } from './model'

// Test state
export { roles, users }

let roles = {

    admin: new Role(0, 'admin'),
    user: new Role(1, 'user'),
    finMan: new Role(2, 'finance-manager')
}

let users = [

    new User(0, 'admin0', 'password', 'Super', 'User', 'admin@organization.org', roles.admin),
    new User(1, 'user0', 'password', 'John', 'Smith', 'peon@organization.org', roles.user),
    new User(2, 'overseer', 'password', 'Sadie', 'Stick', 'taskmaster@organization.org', roles.finMan)

];
