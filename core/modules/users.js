const sha256 = require('sha256').x2;

module.exports.registerAccount = async (login, password, domain) => {
if(!login || !password || !domain) return new global.Err(0, 'empty data', {});

let isUserExists = await query(`SELECT login FROM users WHERE login = ${escape(login)} OR domain = ${escape(domain)}`);
if(isUserExists.length !=0) return new global.Err(global.e.ACCOUNT_EXISTS, 'Account is exists', {});

query(`INSERT INTO users VALUES(NULL, ${escape(login)}, ${escape(sha256(password))}, ${escape(domain)}, 0, 1)`);

return new global.Err(global.e.REGISTER, 'OK', {});

};


