
import { Role } from '../data/model'

export { authUser, authRole, authUserOrRole }

function validUser(req, userId: number): boolean {

    return req.session.user.userId === userId;
}

function validRole(req, role: Role): boolean {

    return req.session.user.role.roleId === role.roleId;
}

function authUser(userId: number) {

    return (req, res, next) => {

        if (!validUser(req, userId)) {
            res.sendStatus(401);
        } else {
            next();
        }
    };
}

function authRole(role: Role) {

    return (req, res, next) => {
        if (!validRole(req, role)) {
            res.sendStatus(401);
        } else {
            next();
        }
    };
}

// only called in situations where userId is a URL parameter
// first argument is function necessary to unwrap id number
// from request parameters
function authUserOrRole(userIdFromParams, role: Role) {

    return (req, res, next) => {

        const valid = validUser(req, userIdFromParams(req)) || validRole(req, role);
        if (!valid) {
            res.sendStatus(401);
        } else {
            next();
        }
    };
}
