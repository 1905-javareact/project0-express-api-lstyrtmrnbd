import { getReimbursementsByStatus, getReimbursementsByUser, patchReimbursement, getReimbursementById, insertReimbursement, getReimbursements } from "./reimbursements-dao";
import { reimbursementFromDTO } from "./reimbursements-dto";
import { Reimbursement } from './model'

export { getReimbursementsByStatusService, getReimbursementsByUserService, patchReimbursementService, insertReimbursementService, getReimbursementsService }

async function getReimbursementsService() {

    const result = await getReimbursements();
    return result.map(reimbursementFromDTO);
}

async function getReimbursementsByStatusService(statusId: number) {

    const sanitary = typeof (statusId) === 'number' && !isNaN(statusId);

    const result = sanitary ? await getReimbursementsByStatus(statusId) : [];
    return result.map(reimbursementFromDTO);
}

async function getReimbursementsByUserService(userId: number) {

    const sanitary = typeof (userId) === 'number' && !isNaN(userId);

    const result = sanitary ? await getReimbursementsByUser(userId) : [];
    return result.map(reimbursementFromDTO);
}

async function getReimbursementByIdService(id: number) {

    const sanitary = typeof (id) === 'number' && !isNaN(id);

    const result = sanitary ? await getReimbursementById(id) : [];
    return result.map(reimbursementFromDTO);

}

// newReim is a Reimbursement-like object
async function patchReimbursementService(newReim) {

    const oldReims = await getReimbursementByIdService(newReim.reimbursementId);

    if (oldReims.length === 0) {

        return false;
    } else {

        const oldReim: Reimbursement = oldReims[0];

        for (let field in newReim) {
            oldReim[field] = oldReim[field] && newReim[field];
        }

        const patch = await patchReimbursement(oldReim);

        return patch ? oldReim : false;
    }
}

async function insertReimbursementService(newReim: Reimbursement) {

    const inserted = await insertReimbursement(newReim);
    return inserted;
}
