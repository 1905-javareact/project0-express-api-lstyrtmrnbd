import express from 'express'

import { Role } from './model'
import { roles, users } from './state'

export { validateUser, validateRole }

export const usersRouter = express.Router();

function validateUser(req, id: number): boolean {

    return req.session.user.userId === id;
}

function validateRole(req, role: Role): boolean {

    return req.session.user.role.roleId === role.roleId;
}

// Find Users
usersRouter.get('', (req, res, next) => {

    const valid = validateRole(req, roles.finMan);

    valid ? res.send(users) : res.sendStatus(401);
});

// Find Users By Id
usersRouter.get('/:id', (req, res, next) => {

    const id: number = parseInt(req.params.id);
    const valid = validateRole(req, roles.finMan) ||
        validateUser(req, id);

    if (!valid) {

        res.sendStatus(401);
    } else {

        const found = users.filter(usr => usr.userId === id);
        found.length != 0 ? res.send(found) :
            res.status(404).send(`User of id ${id} not found`);
    }
});

// Update User
usersRouter.patch('', (req, res, next) => {

    const valid = validateRole(req, roles.admin);
    const newUser = req.body;
    const oldUser = users.find(usr => usr.userId === newUser.userId);

    if (!valid) res.sendStatus(401);

    if (!oldUser) {

        res.status(404).send(`User of id ${newUser.userId} not found`);
    } else {

        for (let field in newUser) { oldUser[field] = oldUser[field] && newUser[field]; }
        res.send(oldUser);
    }
});
