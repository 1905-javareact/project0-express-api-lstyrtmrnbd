import express from 'express'

import { roles, users } from '../data/state'
import { authRole, authUserOrRole } from './authorize';
import { getAllUsersService, getUserByIdService } from '../data/users-service';

export const usersRouter = express.Router();

// Find Users
usersRouter.get('', [authRole(roles.finMan), async (req, res, next) => {

    const result = await getAllUsersService();

    if (!result) {
        res.sendStatus(500);
    } else {
        res.send(result);
    }
}]);

function unwrapId(req): number {

    return parseInt(req.params.id);
}

// Find Users By Id
usersRouter.get('/:id', [authUserOrRole(unwrapId, roles.finMan), async (req, res, next) => {

    const id: number = unwrapId(req);

    const found = await getUserByIdService(id);
    found.length != 0 ? res.send(found[0]) :
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
