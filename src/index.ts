import express from 'express'
import bodyParser from 'body-parser'

import { middleLog, middleSes } from './middle'
import { handleLogin } from './handlers'

////// Expenditure Reimbursement API

const exp = express();

exp.use(middleLog);
exp.use(bodyParser.json());
exp.use(middleSes);

exp.post('/login', handleLogin);

const portNo = 6666;

exp.listen(portNo, () => {
    console.log(`Listening on ${portNo}`)
});

