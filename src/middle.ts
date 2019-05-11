import session from 'express-session'

export { middleLog, middleSes }

function middleLog(req, res, next) {

    console.log(`${req.method} "${req.url}" from ${req.ip}:`);
    console.log(req.body);
    next();
}

const ses = {
    secret: 'yes',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
}

const middleSes = session(ses);
