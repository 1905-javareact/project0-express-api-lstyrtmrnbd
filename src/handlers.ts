import { users } from './state'

export { handleLogin }

function verifyUser(uname, passwd, user): boolean {

    return user.username === uname &&
        user.password == passwd;
}

// instead query DB
function handleLogin(req, res, next) {

    const { username, password } = req.body;
    const user = users.find((usr) => {
        return verifyUser(username, password, usr)
    });

    if (user) {
        req.session.user = user;
        res.send(user);
    } else {
        res.status(400).send({ message: "Invalid Credentials" });
    }
}

