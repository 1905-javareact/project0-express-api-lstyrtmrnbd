set schema 'reimbrs';

begin;

delete from reimbursements;
delete from reimbrs_status;
delete from reimbrs_type;

delete from users;
delete from roles;

drop table reimbursements;
drop table reimbrs_status;
drop table reimbrs_type;

drop table users;
drop table roles;

rollback;
commit;


