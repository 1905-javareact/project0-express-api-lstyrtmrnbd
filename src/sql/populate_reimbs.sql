set schema 'reimbrs';

--begin;
--rollback;

insert into roles values
(default, 'admin'),
(default, 'user'),
(default, 'finance-manager');

select * from roles;

insert into users values
(default, 'admin0', 'password', 'Super', 'User', 'admin@organization.org', 1),
(default, 'user0', 'password', 'John', 'Smith', 'peon@organization.org', 2),
(default, 'overseer0', 'password', 'Sadi', 'Stic', 'taskmaster@organization.org', 3);

select * from users;

insert into reimbrs_status values
(default, 'Pending'),
(default, 'Approved'),
(default, 'Denied');

select * from reimbrs_status;

insert into reimbrs_type values
(default, 'Materials'),
(default, 'Travel'),
(default, 'Spiritual Guidance'),
(default, 'Personal');

select * from reimbrs_type;

insert into reimbursements values
(default, 2, 666.00, 1558106326804, 1558106326805, 'Black candles', 3, 2, 1),
(default, 2, 5.00, 1558106326805, 1558106326806, 'Toothpaste', 3, 3, 4),
(default, 2, 30.00, 1558106326806, 1558106326807, 'Taxi to airport', 3, 3, 2),
(default, 1, 1500.00, 1558106326807, 1558106326808, 'Beeswax', 3, 2, 1);

select * from reimbursements;

--commit;