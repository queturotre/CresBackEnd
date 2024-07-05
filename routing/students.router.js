const express = require('express');

const db = require('../db')

const router = express.Router();

// Ver todos los estudiantes
router.get('/', (req, res) => {
  db.query('SELECT * FROM estudiantes', (err, results) => {
    if (err){
      console.error(err);
      res.status(500).send('Error recuperando estudiantes');
      return
    }
    res.json(results);
  });
});

// Ver estudiante por id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM estudiantes WHERE id = ?', [id], (err, results) => {
    if (err){
      console.error(err);
      res.status(500).send('Error recuperando estudiante');
    } else if (results.length === 0) {
      res.status(404).send('No se ha encontrado el estudiante');
    } else {
      res.json(results);
    }
  });
});

// Ver estudiantes por curso
router.get('/nrc/:nrc', (req, res) => {
  const { nrc } = req.params;
  db.query('SELECT * FROM estudiantes WHERE nrc = ?', [nrc], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error recuperando estudiantes');
    } else if (results.length === 0) {
      res.status(404).send('No se han encontrado estudiantes');
    } else {
      res.json(results);
    }
  });
});

// Añadir estudiante
router.post('/', (req, res) => {
  const { nombre, apellido, cres, nrc } = req.body;
  console.log(req.body);
  db.query('INSERT INTO estudiantes (nombre, apellido, cres, nrc) VALUES (?, ?, ?, ?)', [nombre, apellido, cres, nrc], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('El estudiante debe añadirse a un curso existente.');
    } else {
      res.status(201).send('Estudiante añadido exitosamente');
    }
  });
});

// Eliminar estudiante por id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM estudiantes WHERE id = ?', [id], (err, results) => { // Por qué la variable id va en un arreglo?
    if (err){
      console.error(err);
      res.status(500).send('Error eliminando estudiante');
    } else if (results.affectedRows === 0){
      res.status(404).send('Estudiante no encontrado');
    } else {
      res.status(201).send('Estudiante eliminado');
    }
  });
});

module.exports = router;
