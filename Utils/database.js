const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'chupapi2323**', 
  database: 'security_platform',
});

module.exports = pool.promise();