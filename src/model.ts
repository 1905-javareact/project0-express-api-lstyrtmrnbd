
export { User, Role, Reimbursement, Status, ReimbursementType }

class User {
    userId: number     // primary key
    username: string   // not null, unique
    password: string   // not null
    firstName: string  // not null
    lastName: string   // not null
    email: string      // not null
    role: Role         // not null

    constructor(uid: number, uname: string, passwd: string, first: string, last: string, email: string, role: Role) {

        this.userId = uid;
        this.username = uname;
        this.password = passwd;
        this.firstName = first;
        this.lastName = last;
        this.email = email;
        this.role = role;
    }
}

class Role {
    roleId: number     // primary key
    role: string       // not null, unique

    constructor(roleId: number, role: string) {

        this.roleId = roleId;
        this.role = role;
    }
}

class Reimbursement {
    reimbursementId: number   // primary key
    author: number            // foreign key -> User, not null
    amount: number            // not null
    dateSubmitted: number     // not null
    dateResolved: number      // not null
    description: string       // not null
    resolver: number          // foreign key -> User
    status: number            // foreign ey -> ReimbursementStatus, not null
    _type: number // foreign key -> ReimbursementType
}

class Status {
    statusId: number // primary key
    status: string   // not null, unique
}

class ReimbursementType {
    typeId: number // primary key
    _type: string // not null, unique
}

