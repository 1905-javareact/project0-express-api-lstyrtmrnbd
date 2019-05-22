import { Reimbursement } from './model';
import { reimbursementToDTO } from './reimbursements-dto';
import { queryParams } from './dao-common'

export { getReimbursementsByStatus, getReimbursementsByUser, getReimbursementById, patchReimbursement, insertReimbursement, getReimbursements }

async function getReimbursements() {

    const queryStatusId = 'SELECT * FROM reimbrs.reimbursements;'

    return await queryParams(queryStatusId);
}

async function getReimbursementsByStatus(id: number) {

    const queryStatusId = 'SELECT * FROM reimbrs.reimbursements WHERE status_id = $1;'

    return await queryParams(queryStatusId, id);
}

async function getReimbursementsByUser(id: number) {

    const queryUserId = 'SELECT * FROM reimbrs.reimbursements WHERE author = $1;'

    return await queryParams(queryUserId, id)
}

async function getReimbursementById(id: number) {

    const queryReimId = 'SELECT * FROM reimbrs.reimbursements WHERE reimbrs_id = $1;'

    return await queryParams(queryReimId, id);
}

async function patchReimbursement(newReim: Reimbursement) {

    const dto = reimbursementToDTO(newReim);
    const { author, amount, date_submit, date_resolve,
        description, resolver, status_id, type_id, reimbrs_id } = dto;

    const updateReim = 'UPDATE reimbrs.reimbursements SET author = $1, amount = $2, date_submit = $3, date_resolve = $4, description = $5, resolver = $6, status_id = $7, type_id = $8 WHERE reimbrs_id = $9;';

    return await queryParams(updateReim, author, amount, date_submit, date_resolve,
        description, resolver, status_id, type_id, reimbrs_id);
}

async function insertReimbursement(newReim: Reimbursement) {

    const dto = reimbursementToDTO(newReim);
    const { author, amount, date_submit, date_resolve,
        description, resolver, status_id, type_id } = dto;

    const insertReim = 'INSERT INTO reimbrs.reimbursements VALUES(default, $1, $2, $3, $4, $5, $6, $7, $8);';

    return await queryParams(insertReim, author, amount, date_submit, date_resolve,
        description, resolver, status_id, type_id);
}
