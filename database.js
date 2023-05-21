const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

const init = () => {
    db.serialize(() => {
        db.run("CREATE TABLE Users (username TEXT, password TEXT)")})}




async function userExists(username) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Users WHERE username = $username `, { $username: username }, (error, rows) => {
            if( error ) reject(error)
			else resolve(rows.length === 1)
        })
    })
}

async function registerUser(username, password) {
	const sql = `INSERT INTO Users (username, password) VALUES ($username, $password)`
	const params = { $username: username, $password: password }
	return new Promise((resolve, reject) => {
		db.run(sql, params, (error,result) => {
			if( error ){
				

				reject(error)
			}
			else resolve(result)
		})
		
	})
}

async function getPassword(username) {
	const sql = 'SELECT password FROM Users WHERE username = $username'
	const params = { $username: username}

	return new Promise((resolve, reject) => {
		db.get(sql, params, (error, rows) => {
			if( error ) reject(error)
			else resolve(rows.password)
		})
	})
}



async function validateLogin(username, password) {
	const sql = 'SELECT * FROM Users WHERE username = $username AND password = $password '
	const params = { $username: username, $password: password }

	return new Promise((resolve, reject) => {
		db.all(sql, params, (error, rows) => {
			if( error ) reject(error)
			else resolve(rows.length === 1)
		})
	})
}

module.exports = {userExists,registerUser,validateLogin,getPassword,init}