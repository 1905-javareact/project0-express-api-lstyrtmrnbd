
import { Role } from './model'

export { authUser, authRole, authUserOrRole }

function validUser(req, userId: number): boolean {

    return req.session.user.userId === userId;
}

function validRole(req, role: Role): boolean {

    return req.session.user.role.roleId === role.roleId;
}

function authUser(req, res, userId: number): void {

    if (!validUser(req, userId)) res.sendStatus(401);
}

function authRole(req, res, role: Role): void {

    if (!validRole(req, role)) res.sendStatus(401);
}

function authUserOrRole(req, res, userId: number, role: Role): void {

    if (!validUser(req, userId) || !validRole(req, role)) res.sendStatus(401);
}
