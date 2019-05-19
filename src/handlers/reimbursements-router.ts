import express from 'express'

import { Reimbursement } from '../data/model'
import { reimbursements, roles } from '../data/state'
import { authRole, authUserOrRole } from './authorize';
import { getReimbursementsByStatusService, getReimbursementsByUserService } from '../data/reimbursements-service';

export const reimbursementsRouter = express.Router();

// Submit Reimbursement
// requires 'amount', 'description', 'type'
reimbursementsRouter.post('', (req, res, next) => {

    const author = req.session.user.userId;
    const id = reimbursements.length;
    const sentReim: Reimbursement = req.body;

    const newReim = new Reimbursement(id, author, sentReim.amount, Date.now(), 0, sentReim.description, 0, 0, sentReim.type);

    reimbursements.push(newReim);
    res.send(newReim);
});

// Dump all reimbursements for testing
reimbursementsRouter.get('', (req, res, next) => {

    res.send(reimbursements);
});

// Find Reimbursements By Status
reimbursementsRouter.get('/status/:statusId', [authRole(roles.finMan), async (req, res, next) => {

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
reimbursementsRouter.get('/author/userId/:userId', [authUserOrRole(unwrapId, roles.finMan), async (req, res, next) => {

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
reimbursementsRouter.patch('', [authRole(roles.finMan), (req, res, next) => {

    const newReim = req.body;
    const oldReim = reimbursements.find(re => re.reimbursementId === newReim.reimbursementId);

    if (!oldReim) {

        res.status(404).send(`Reimbursement of id ${newReim.reimbursementId} not found`)
    } else {

        for (let field in newReim) { oldReim[field] = oldReim[field] && newReim[field]; }
        res.send(oldReim);
    }
}]);
