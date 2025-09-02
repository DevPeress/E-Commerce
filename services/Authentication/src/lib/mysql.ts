import mysql, { Pool } from "mysql2/promise";

const db: Pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "Empresa",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
