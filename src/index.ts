import express from 'express'
import bodyParser from 'body-parser'

import { middleLog, middleSes } from './handlers/middle'
import { handleLogin } from './handlers/handlers'
import { usersRouter } from './handlers/users-router'
import { reimbursementsRouter } from './handlers/reimbursements-router'

//// Expenditure Reimbursement API

const exp = express();

/// Routing stack

exp.use(bodyParser.json());
exp.use(middleLog);
exp.use(middleSes);

exp.post('/login', handleLogin);
exp.use('/users', usersRouter);
exp.use('/reimbursements', reimbursementsRouter);
/// Init

const portNo = 6666; // AV loves this

exp.listen(portNo, () => {
    console.log(`Listening on ${portNo}`)
});

