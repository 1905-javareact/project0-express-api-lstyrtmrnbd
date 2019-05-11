import express from 'express'
import bodyParser from 'body-parser'

import { middleLog, middleSes } from './middle'

////// Expenditure Reimbursement API

const exp = express();

exp.use(middleLog);
exp.use(bodyParser.json());
exp.use(middleSes);

const portNo = 6666;

exp.listen(portNo, () => {
    console.log(`Listening on ${portNo}`)
});

