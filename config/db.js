// THIS FILE IS TO CONNECT TO DATABASE AND MAKING IT AVAILALBE

const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST, //made them all environment variables
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

db.connect();

module.exports = db;
