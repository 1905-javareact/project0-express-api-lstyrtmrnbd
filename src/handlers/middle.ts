import session from 'express-session'

export { middleLog, middleSes, middleCors }

function middleLog(req, res, next) {

    console.log(`${req.method} "${req.url}" from ${req.ip}:`);
    console.log(req.body);
    next();
}

function middleCors(req, res, next) {

    res.header('Access-Control-Allow-Origin', `${req.headers.origin}`)//this is a hack, if you do it in a project I will be very disappointed in you
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Credentials', 'true')
    next();
}

const ses = {
    secret: 'yes',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
}

const middleSes = session(ses);
