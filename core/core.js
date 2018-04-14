/* Настраиваем MYSQL соединение */

const mysql = require('promise-mysql');

const pool = mysql.createPool(global.config.site.mysql);


/* Всякие фуцнкции типо запроса */

global.query = async (query) => {
	let connection = await pool.getConnection();
	return await connection.query(query);
}
global.escape = (v)=>{
return mysql.escape(v);
}

/* Выносим все модули из /modules/ */

global.fs.readdir('./core/modules/', (err, files) => {
	files.forEach(file => module.exports[file.replace('.js', '')] = require(`./modules/${file}`))
})

