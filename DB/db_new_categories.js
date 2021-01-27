function db_new_categories(category) {
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

   
            const sqll = `INSERT INTO categories (category) VALUES(?)`;
            

            
            connection.query(sqll, category, function(err, results) {
                if(err) console.log(err);
                console.log(results)

                if (results) {
                    let a;
                  

                    a = {
                        server_status: "true"
                    }
                    console.log(a);

                    
           

                    resolve(a);
                } else {
                    resolve(false);
                }
            });
        });
}

module.exports = {
    db_new_categories: db_new_categories
}