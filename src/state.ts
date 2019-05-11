import { User, Role, Reimbursement } from './model'

// Test state
export { roles, users, reimbursements, reimCount }

let roles = {

    admin: new Role(0, 'admin'),
    user: new Role(1, 'user'),
    finMan: new Role(2, 'finance-manager')
}

const users: User[] = [

    new User(0, 'admin0', 'password', 'Super', 'User', 'admin@organization.org', roles.admin),
    new User(1, 'user0', 'password', 'John', 'Smith', 'peon@organization.org', roles.user),
    new User(2, 'overseer', 'password', 'Sadie', 'Stick', 'taskmaster@organization.org', roles.finMan)

];

const reimbursements: Reimbursement[] = [

    new Reimbursement(0, 0, 6.66, 1557532800, 1557532801, 'toothpaste', 2, 2, 3)
];
