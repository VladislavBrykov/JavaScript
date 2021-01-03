const alert1 = document.querySelector('.form_auth_button')
let mail = "";
let pass = "";
let name = "";
let login = "";

alert1.addEventListener('click', () => {
    mail = (document.getElementById("mail").value)
    document.getElementById("mail").value = '';
    console.log(mail);

    pass = (document.getElementById("pass").value)
    document.getElementById("pass").value = '';
    console.log(pass);

    name = (document.getElementById("name").value)
    document.getElementById("name").value = '';
    console.log(name);

    login = (document.getElementById("login").value)
    document.getElementById("login").value = '';
    console.log(login);

})

const EatException = require("./workSql");


// const mysql = require('mysql2');   //установил модуль mysql2
//
// const connection = mysql.createConnection({
//
//     host     : 'localhost', // MYSQL HOST NAME
//     user     : 'vbrykov', // MYSQL USERNAME
//     password : 'Vladislav5Vladislav5', // MYSQL PASSWORD
//     database : 'ucode_web' // MYSQL DB NAME
// });
//
// connection.connect( err =>  {
//     if (err) {
//         console.log(err)
//         return err;
//     }
//     else {
//         console.log('DB ++++++')
//     }
// });
//
//
// const sql = "INSERT INTO heroes (first_name, last_name) VALUES (?, ?)";
// const data = ["ket", "vbrykova"];
// connection.query(sql, data, function (err, results) {
//     if(err) console.log(err);
//     console.log(results);
// })
//
//
// let query = "SELECT * FROM heroes";
// connection.query(query, (err, result) => {
//     console.log(err);
//     console.log(result);
// })