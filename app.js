const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
global.config = require('./core/config.js');
global.fs = require('fs-extra');
global.logger = (t)=>console.log(t);
global.core = require('./core/core.js');
global.e = require('./core/err.js');
global.Err = class Err {
	constructor(code, msg, hideInfo) {
		this.code = code;
		this.msg = msg;
		this.hideInfo = hideInfo;
	}
	get response() {
		let r = JSON.stringify({
			code: this.code,
			msg: this.msg
		});;
		global.logger(r);
		return r;
	}
}



/* ROUTES */

const api = require('./routes/api.js');
app.use('/', express.static(path.join(__dirname, 'public')));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api', api);


app.listen(global.config.site.port, function () {
  console.log('Example app listening on port '+global.config.site.port+'!');
});