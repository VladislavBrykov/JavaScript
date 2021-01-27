function db_logout(id) {
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
       // });

       const db_t = "CREATE TABLE IF NOT EXISTS online (id_user INT(10) NOT NULL, role_user varchar(100) NOT NULL);"
       connection.query(db_t, function(err, results) {
           if(err) console.log(err);
           console.log(results);
       });

        let online = "off";
        let idd = id;
        connection.query('UPDATE online SET role_user = ? WHERE id_user = ?', [online, idd]) 
        if(err) console.log(err);
        else {
            console.log(results);
                let a = {
                    class_role: "off"
                }
                resolve(a);
        }
            });
    });
}

module.exports = {
    db_logout: db_logout
}