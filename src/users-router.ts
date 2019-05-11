import express from 'express'

//import { Role, User } from './model'
import { roles, users } from './state'

export const usersRouter = express.Router();

// Find Users

function validateRole(req, role): boolean {

    return req.session.user.role.roleId === role.roleId;
}

usersRouter.get('', (req, res, next) => {

    const valid = validateRole(req, roles.finMan);

    valid ? res.send(users) : res.sendStatus(401);
});
