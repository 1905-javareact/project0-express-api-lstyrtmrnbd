import { getUserByUsernameService } from '../data/users-service';

export { handleLogin }

// instead query DB
async function handleLogin(req, res, next) {

    const { username, password } = req.body;
    const found = await getUserByUsernameService(username);

    if (found.length != 0 && found[0].password === password) {

        req.session.user = found[0];
        res.send(found[0]);
    } else {
        res.status(400).send({ message: "Invalid Credentials" });
    }
}

