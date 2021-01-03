function workSql() {

    const mysql = require('mysql2');   //установил модуль mysql2

    const connection = mysql.createConnection({

        host: 'localhost', // MYSQL HOST NAME
        user: 'vbrykov', // MYSQL USERNAME
        password: 'Vladislav5Vladislav5', // MYSQL PASSWORD
        database: 'ucode_web' // MYSQL DB NAME
    });


        connection.connect(err => {
            if (err) {
                console.log(err)
                return err;
            } else {
                console.log('DB ++++++')
            }
        });
        const sql = "INSERT INTO heroes (first_name, last_name) VALUES (?, ?)";
        const data = ["ket", "vbrykova"];
        connection.query(sql, data, function (err, results) {
            if (err) console.log(err);
            console.log(results);
        })


        let query = "SELECT * FROM heroes";
        connection.query(query, (err, result) => {
            console.log(err);
            console.log(result);
        })
    }

module.exports = workSql;