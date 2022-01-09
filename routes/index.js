var express = require('express');
var router = express.Router();

/* DB MySQL Workbench */

var mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'webpage2401', /* verificar */
    database: 'adopcion'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Envio de database a my-app */

router.get('/api/adoptar', (req, res) => {
  /* Primero se hace el llamado a la DB para traer los datos que se van a renderizar */
  connection.query(
      "SELECT * FROM mascotas WHERE estadomascota = 'En Adopción' ORDER BY nombreMascota ASC;",
      function(err, results) {
          console.log(results);
          res.send(results)
      }
  );
});

/* Adopción de Mascota desde my-app */

router.post('/api/enviar-adoptar', (req, res) => {
  console.log(req.body);
  const { adoptado, nombre, telefono, email } = req.body.data;

  /* Cambio de estado en mascotas a adoptar */

  connection.connect(function(err) {
      if (err) throw err;
      var sql = `UPDATE mascotas SET estadoMascota = 'Por ser adoptada' WHERE nombreMascota = '${adoptado}'`;
      connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      });
  });

  res.send(200);

});

module.exports = router;
