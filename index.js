
let jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'prod') { require('dotenv').config(); }

let payLoad = { "issuer": process.env.CLIENT_ID };

if (process.env.IS_CENTRAL == 'false') {
    const strBuf = Buffer.from(process.env.SUBS_ID);
    payLoad['subsId'] = strBuf.toString('base64');
}

if (process.env.IS_EXP == 'false') {
    console.log("Infinite life token.");
    console.log(jwt.sign(payLoad, Buffer.from(process.env.JWT_SECRET).toString('base64')));
} else {
    console.log("token with expiration time.");
    console.log(jwt.sign(payLoad, Buffer.from(process.env.JWT_SECRET).toString('base64'), { expiresIn: `${process.env.JWT_TTL}s` }));
}