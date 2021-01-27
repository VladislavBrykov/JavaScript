function db_update_comment(status, comment_id) {
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

        connection.query('UPDATE comments SET status = ? WHERE id = ?', [status, comment_id]);
       
          
                
                let a = {
                    update: "true"
                }
                resolve(a);
            });
}

module.exports = {
    db_update_comment: db_update_comment
}
