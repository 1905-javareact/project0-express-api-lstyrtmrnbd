import express from 'express'

import { authRoles, authUserOrRoles } from './authorize';
import { getAllUsersService, getUserByIdService, patchUserService } from '../data/users-service';
import { roles } from '../data/model'

export const usersRouter = express.Router();

// Find Users
usersRouter.get('', [authRoles([roles.finMan, roles.admin]), async (req, res, next) => {

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
usersRouter.get('/:id', [authUserOrRoles(unwrapId, [roles.finMan, roles.admin]), async (req, res, next) => {

    const id: number = unwrapId(req);

    const found = await getUserByIdService(id);
    found.length != 0 ? res.send(found[0]) :
        res.status(404).send(`User of id ${id} not found`);
}]);

// Update User
usersRouter.patch('', [authRoles([roles.admin]), async (req, res, next) => {

    const newUser = req.body;
    const oldUser = await patchUserService(newUser);

    if (!oldUser) {

        res.status(404).send(`User of id ${newUser.userId} not found`);
    } else {

        res.send(oldUser);
    }
}]);
