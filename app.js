let express = require('express');
let bodyParser = require('body-parser');
let mysql = require('mysql');

let app = express();

app.use(bodyParser.json());

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeDB'
});

mysqlConnection.connect((err) => {
    if(err) {
        console.log("Error " + err);
        return;
    }

    console.log("Connection success");
})

app.listen(3000, () => console.log('Express server is runnig on port 3000'));

//Get all employees
app.get('/api/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM employees', (err, rows, fields) => {
        if(err) {
            console.log(err);
            return;
        }
        res.send(rows);
       
    })
});

app.get('/api/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM employees WHERE id =?', [req.params.id], (err, rows, field) => {
        if(err) {
            console.log(err);
            return;
        }
        res.send(rows);
    });

});

app.delete('/api/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM employees WHERE id=?', [req.params.id], (err, rows, fields) => {
        if(err) {
            console.log(err);
            return;
        }
        res.send("Employee deleted");
    })
});
  
app.post('/api/employees', (req, res) => {
    let employee = req.body;
    mysqlConnection.query("INSERT INTO employees VALUES(?, ?, ?)", [null, employee.name, employee.email], (err, rows, fields) => {
        if(err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
});

app.put('/api/employees/:id', (req, res) => {
    let employee = req.body;
    mysqlConnection.query("UPDATE employees SET id=?, name=?, email=? WHERE id=?", [employee.id, employee.name, employee.email, req.params.id], (err, rows, fields) => {
        if(err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
});