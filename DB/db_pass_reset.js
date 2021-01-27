function db_pass_reset(id, password) {
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

        let pass = password;
        let idd = id;
        connection.query('UPDATE users SET password = ? WHERE id = ?', [password, idd]);
                
                let a = {
                    new_password: "true"
                }
                resolve(a);
            
    });
}

module.exports = {
    db_pass_reset: db_pass_reset
}