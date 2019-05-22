set schema 'reimbrs';

--begin;
--rollback;

/*
 *  roleId: number     // primary key
 *  role: string       // not null, unique
 */

create table roles(
role_id serial primary key,
role_name text unique not null
);

/*
 *  userId: number     // primary key
 *  username: string   // not null, unique
 *  password: string   // not null
 *  firstName: string  // not null
 *  lastName: string   // not null
 *  email: string      // not null
 *  role: Role         // not null
 */

create table users(
user_id serial primary key,
username text unique not null,
passwd text not null,
first_name text not null,
last_name text not null,
email text not null,
role_id integer references roles (role_id) not null 
);

/*
 *  statusId: number // primary key
 *  status: string   // not null, unique
 */

create table reimbrs_status(
status_id serial primary key,
status_name text unique not null
);

/*
 *  typeId: number // primary key
 *  type: string   // not null, unique
 */

create table reimbrs_type(
type_id serial primary key,
type_name text unique not null
);

/*
 *  reimbursementId: number   // primary key
 *  author: number            // foreign key -> User, not null
 *  amount: number            // not null
 *  dateSubmitted: number     // not null
 *  dateResolved: number      // not null
 *  description: string       // not null
 *  resolver: number          // foreign key -> User
 *  status: number            // foreign key -> ReimbursementStatus, not null
 *  type: number              // foreign key -> ReimbursementType
 */

create table reimbursements(
reimbrs_id serial primary key,
author integer references users (user_id) not null,
amount numeric not null,
date_submit bigint not null,
date_resolve bigint not null,
description text not null,
resolver integer references users (user_id),
status_id integer references reimbrs_status (status_id) not null,
type_id integer references reimbrs_type (type_id)
);

--commit;
