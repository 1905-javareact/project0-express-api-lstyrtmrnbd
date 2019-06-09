import express from 'express'

import { Reimbursement, roles } from '../data/model'
import { authRoles, authUserOrRoles } from './authorize';
import { getReimbursementsByStatusService, getReimbursementsByUserService, patchReimbursementService, insertReimbursementService, getReimbursementsService } from '../data/reimbursements-service';

export const reimbursementsRouter = express.Router();

// Submit Reimbursement
// requires 'amount', 'description', 'type'
reimbursementsRouter.post('', (req, res, next) => {

    const author = req.session.user.userId;
    const sentReim: Reimbursement = req.body;

    const newReim = new Reimbursement(0, author, sentReim.amount, Date.now(), 0, sentReim.description, 3, 1, sentReim.type);

    const inserted = insertReimbursementService(newReim);

    if (!inserted) {
        res.sendStatus(500);
    } else {
        res.send(newReim);
    }
});

// Dump all reimbursements for testing
reimbursementsRouter.get('', async (req, res, next) => {

    res.send(await getReimbursementsService());
});

// Find Reimbursements By Status
reimbursementsRouter.get('/status/:statusId', [authRoles([roles.admin, roles.finMan]), async (req, res, next) => {

    const id = parseInt(req.params.statusId);
    const found = await getReimbursementsByStatusService(id);

    if (found.length === 0) {

        res.status(404).send(`No reimbursements of status ${id} found`);
    } else {

        res.send(found.sort((a, b) => {
            return a.dateSubmitted - b.dateSubmitted;
        }));
    }
}]);

function unwrapId(req): number {

    return parseInt(req.params.userId);
}

// Find Reimbursements By User
reimbursementsRouter.get('/author/userId/:userId', [authUserOrRoles(unwrapId, [roles.finMan, roles.admin]), async (req, res, next) => {

    const id: number = unwrapId(req);
    const found = await getReimbursementsByUserService(id);

    if (found.length === 0) {

        res.status(404).send(`No reimbursements authored by userId ${id}`);
    } else {

        res.send(found.sort((a, b) => {
            return a.dateSubmitted - b.dateSubmitted;
        }));
    }
}]);

// Update Reimbursement
reimbursementsRouter.patch('', [authRoles([roles.finMan, roles.admin]), async (req, res, next) => {

    const newReim = req.body;
    const oldReim = await patchReimbursementService(newReim);

    if (!oldReim) {

        res.status(404).send(`Reimbursement of id ${newReim.reimbursementId} not found`)
    } else {

        res.send(oldReim);
    }
}]);
