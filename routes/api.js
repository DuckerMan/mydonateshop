var express = require('express');
var router = express.Router();
const sanitizer = require('sanitizer');

router.post('/:method', async function(req, res, next) {
	res.statusCode = 200;
	let params = {};
	for (let item in req.body) {
		params[item] = sanitizer.escape(req.body[item]);
	}


	console.log(params);
	switch (req.params.method) {
		case 'users.register':
			let r = await global.core.users.registerAccount(params.login, params.password, params.domain);
			res.send(r.response);
			break;
	}
	res.send('Параметр: ' + req.params.method);
});

router.get('/', function(req, res, next) {
	res.send('Эта страница служит для АПИ запросов.');
});
module.exports = router;