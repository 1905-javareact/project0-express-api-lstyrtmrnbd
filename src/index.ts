import express from 'express'
import bodyParser from 'body-parser'

import { middleLog, middleSes } from './middle'
import { handleLogin } from './handlers'
import { usersRouter } from './users-router'

//// Expenditure Reimbursement API

const exp = express();

/// Routing stack

exp.use(bodyParser.json());
exp.use(middleLog);
exp.use(middleSes);

exp.post('/login', handleLogin);
exp.use('/users', usersRouter);

/// Init

const portNo = 6666; // AV loves this

exp.listen(portNo, () => {
    console.log(`Listening on ${portNo}`)
});

