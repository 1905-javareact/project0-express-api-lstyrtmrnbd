import { getReimbursementsByStatus, getReimbursementsByUser } from "./reimbursements-dao";

export { getReimbursementsByStatusService, getReimbursementsByUserService }

async function getReimbursementsByStatusService(statusId: number) {

    const sanitary = typeof (statusId) === 'number' && !isNaN(statusId);

    const result = sanitary ? await getReimbursementsByStatus(statusId) : [];
    return result;
}

async function getReimbursementsByUserService(userId: number) {

    const sanitary = typeof (userId) === 'number' && !isNaN(userId);

    const result = sanitary ? await getReimbursementsByUser(userId) : [];
    return result;
}
