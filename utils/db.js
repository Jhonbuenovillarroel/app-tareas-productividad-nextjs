import mysql from "mysql2";

const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "jhonbueno",
   database: "crud",
});

export default connection;
