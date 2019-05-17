import express from 'express'

import { roles, users } from '../data/state'
import { authRole, authUserOrRole } from './authorize';

export const usersRouter = express.Router();

// Find Users
usersRouter.get('', [authRole(roles.finMan), (req, res, next) => {

    res.send(users);
}]);

function unwrapId(req): number {

    return parseInt(req.params.id);
}

// Find Users By Id
usersRouter.get('/:id', [authUserOrRole(unwrapId, roles.finMan), (req, res, next) => {

    const id: number = unwrapId(req);

    const found = users.filter(usr => usr.userId === id);
    found.length != 0 ? res.send(found) :
        res.status(404).send(`User of id ${id} not found`);
}]);

// Update User
usersRouter.patch('', [authRole(roles.admin), (req, res, next) => {

    const newUser = req.body;
    const oldUser = users.find(usr => usr.userId === newUser.userId);

    if (!oldUser) {

        res.status(404).send(`User of id ${newUser.userId} not found`);
    } else {

        for (let field in newUser) { oldUser[field] = oldUser[field] && newUser[field]; }
        res.send(oldUser);
    }
}]);
