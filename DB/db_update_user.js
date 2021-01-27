function db_update_user(id, email, login, password) {
    const mysql = require("mysql2");

    const connection = mysql.createConnection({
        host: "localhost",
        user: "Vladislav5",
        database: "project",
        password: "Vladislav5"
    });

    return new Promise((resolve, reject) => {
        const create_db = "CREATE DATABASE IF NOT EXISTS project";
        connection.query(create_db, function(err, results) {
            if(err) console.log(err);
            console.log(results);
        });
        
        const db = "USE project";
        connection.query(db, function(err, results) {
            if(err) console.log(err);
            console.log(results);
        });

            connection.query('UPDATE users SET email = ? WHERE id = ?', [email, id]);
            connection.query('UPDATE users SET login = ? WHERE id = ?', [login, id]);
            connection.query('UPDATE users SET password = ? WHERE id = ?', [password, id]);
                let a = {
                    update: "true"
                }
                resolve(a);
    });
}

module.exports = {
    db_update_user: db_update_user
}