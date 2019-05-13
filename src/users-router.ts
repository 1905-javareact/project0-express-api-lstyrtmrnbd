import express from 'express'

import { Role } from './model'
import { roles, users } from './state'
import { authRole, authUserOrRole } from './authorize';

export const usersRouter = express.Router();

// Find Users
usersRouter.get('', (req, res, next) => {

    authRole(req, res, roles.finMan);
    res.send(users);
});

// Find Users By Id
usersRouter.get('/:id', (req, res, next) => {

    const id: number = parseInt(req.params.id);

    authUserOrRole(req, res, id, roles.finMan);

    const found = users.filter(usr => usr.userId === id);
    found.length != 0 ? res.send(found) :
        res.status(404).send(`User of id ${id} not found`);
});

// Update User
usersRouter.patch('', (req, res, next) => {

    authRole(req, res, roles.admin);

    const newUser = req.body;
    const oldUser = users.find(usr => usr.userId === newUser.userId);

    if (!oldUser) {

        res.status(404).send(`User of id ${newUser.userId} not found`);
    } else {

        for (let field in newUser) { oldUser[field] = oldUser[field] && newUser[field]; }
        res.send(oldUser);
    }
});
