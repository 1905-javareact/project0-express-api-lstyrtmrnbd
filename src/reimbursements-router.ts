import express from 'express'

import { Reimbursement } from './model'
import { reimbursements } from './state'
//import { validateUser, validateRole } from './users-router'

export const reimbursementsRouter = express.Router();

// Submit Reimbursement
// requires 'amount', 'description', 'type'
reimbursementsRouter.post('', (req, res, next) => {

    const author = req.session.user.userId;
    const id = reimbursements.length;
    const newReim: Reimbursement = req.body;

    reimbursements.push(new Reimbursement(id, author, newReim.amount, Date.now(), 0, newReim.description, 0, 0, newReim._type));
});

