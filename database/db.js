const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "corerh",
    password: "root",
    port: 5433
});

module.exports = pool;

pool.query("SELECT NOW()", (err, res) => {

    if (err) {
        console.error("Erro ao conectar no banco", err);
    } else {
        console.log("Conectado ao PostgreSQL:", res.rows[0]);
    }

});