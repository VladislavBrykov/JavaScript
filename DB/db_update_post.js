function db_update_post(post_id, title, content, categories, status) {
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

        connection.query('UPDATE posts SET title = ? WHERE id = ?', [title, post_id]);
        connection.query('UPDATE posts SET content = ? WHERE id = ?', [content, post_id]);
        connection.query('UPDATE posts SET status= ? WHERE id = ?', [status, post_id]);
            
             const sqll = `SELECT id FROM categories WHERE category = ?`;
             connection.query(sqll, categories, function(err, results) {
                 if(err) console.log(err);
                 console.log(results);
                 let id_categories = results[0];
                 console.log(id_categories.id);
            
             connection.query('UPDATE posts SET id_categiries = ? WHERE id = ?', [id_categories.id, post_id]);
                
                let a = {
                    update: "true"
                }
                resolve(a);
             });
    });
}

module.exports = {
    db_update_post: db_update_post
}
