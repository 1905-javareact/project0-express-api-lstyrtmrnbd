import express from 'express'

import { Reimbursement } from './model'
import { reimbursements, roles } from './state'
import { validateUser, validateRole } from './users-router'

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
reimbursementsRouter.get('/status/:statusId', (req, res, next) => {

    const id = parseInt(req.params.statusId);
    const valid = validateRole(req, roles.finMan);

    if (!valid) {

        res.sendStatus(401);
    } else {

        const found = reimbursements.filter(re => re.status === id);
        if (found.length === 0) {

            res.status(404).send(`No reimbursements of status ${id} found`);
        } else {

            res.send(found.sort((a, b) => {
                return a.dateSubmitted - b.dateSubmitted;
            }));
        }
    }
});

// Find Reimbursements By User
reimbursementsRouter.get('/author/userId/:userId', (req, res, next) => {

    const id = parseInt(req.params.userId);
    const valid = validateRole(req, roles.finMan) || validateUser(req, id);

    if (!valid) {

        res.sendStatus(401);
    } else {

        const found = reimbursements.filter(re => re.author === id);
        if (found.length === 0) {

            res.status(404).send(`No reimbursements authored by userId ${id}`);
        } else {

            res.send(found.sort((a, b) => {
                return a.dateSubmitted - b.dateSubmitted;
            }));
        }
    }
});

// Update Reimbursement
reimbursementsRouter.patch('', (req, res, next) => {

    const valid = validateRole(req, roles.finMan);
    const newReim = req.body;
    const oldReim = reimbursements.find(re => re.reimbursementId === newReim.reimbursementId);

    if (!valid) res.sendStatus(401);

    if (!oldReim) {

        res.status(404).send(`Reimbursement of id ${newReim.reimbursementId} not found`)
    } else {

        for (let field in newReim) { oldReim[field] = oldReim[field] && newReim[field]; }
        res.send(oldReim);
    }
});
