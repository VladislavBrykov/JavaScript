function db_delete_category(id) {
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

        let search = "категория не выбрана";
        const sqll = `SELECT id FROM categories WHERE category = ?`;
        connection.query(sqll, search, function(err, results) {
            if(err) console.log(err);
            results = results[0];
            results = results.id;
            console.log(results)
    
   
        connection.query('UPDATE posts SET id_categiries = ? WHERE id_categiries = ?', [results, id]);
        connection.query('DELETE FROM categories WHERE id = ?', [id]);

                let a = {
                    update: "true"
                }
                resolve(a);
});

     });
}

module.exports = {
    db_delete_category: db_delete_category
}