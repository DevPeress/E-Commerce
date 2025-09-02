import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "Empresa",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
