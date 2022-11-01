const DbClient = require('ali-mysql-client')

const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const mysql = new DbClient({
  host: host,
  port:port,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: 'golang_demo'
})

module.exports = mysql