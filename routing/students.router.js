const express = require('express');

const db = require('../db')

const router = express.Router();

// Ver todos los estudiantes
router.get('/estudiantes', (req, res) => {
  db.query('SELECT * FROM estudiantes', (err, results) => {
    if (err){
      console.error(err);
      res.status(500).send('Error recuperando estudiantes');
      return
    }
    res.json(results);
  });
});

// Ver estudiantes por curso
router.get('/estudiantes/:nrc', (req, res) => {
  const { nrc } = req.params;
  db.query('SELECT * FROM estudiantes WHERE nrc = ?', [nrc], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error recuperando estudiantes');
    } else if (results.length === 0) {
      res.status(404).send('No se han encontrado cursos');
    } else {
      res.json(results[0]);
    }
  });
});

// Añadir estudiante
router.post('/estudiantes', (req, res) => {
  const { nombre, apellido, cres, nrc } = req.body;
  db.query('INSERT INTO estudiantes (nombre, apellido, cres, nrc) VALUES (?, ?, ?, ?)', [nombre, apellido, cres, nrc], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error añadiendo estudiante');
    } else {
      res.status(201).send('Estudiante añadido exitosamente').json(results);
    }
  });
});

// Eliminar estudiante por curso
router.delete('/estudiantes/:id', (req, res) => {
  const { id } = req.params; // Cómo saber que el id sí es el id?
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
