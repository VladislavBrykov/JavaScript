function db_delete_post(id) {
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

            connection.query('DELETE FROM likes WHERE post_id = ?', [id]);
            connection.query('DELETE FROM comments WHERE id_post = ?', [id]);
            connection.query('DELETE FROM posts WHERE id = ?', [id]);
                let a = {
                    update: "true"
                }
                resolve(a);
    });
}

module.exports = {
    db_delete_post: db_delete_post
}