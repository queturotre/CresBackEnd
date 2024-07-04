const express = require('express');

const db = require('../db');

const router = express.Router();

// Ver cursos
router.get('/cursos', (req, res) => {
  db.query('SELECT * FROM cursos', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving courses');
    } else {
      res.json(results);
    }
  });
});

// Añadir curso
router.post('/cursos', (req, res) => {
  const { nrc, grado, curso } = req.body;
  db.query('INSERT INTO cursos (nrc, grado, curso) VALUES (?, ?, ?)', [nrc, grado, curso], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error añadiendo curso');
    } else {
      res.status(201).send('Curso añadido exitosamente');
      res.json(results);
    }
  });
});

// Eliminar curso
router.delete('/cursos/:nrc', (req, res) => {
  const { nrc } = req.params;
  db.query('DELETE FROM estudiantes WHERE nrc = ?', [nrc], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error eliminando estudiantes');
    } else {
      db.query('DELETE FROM cursos WHERE nrc = ?', [nrc], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error eliminando curso');
        } else if (results.affectedRows === 0) {
          res.status(404).send('Curso no encontrado');
        } else {
          res.status(200).send('Curso eliminando exitosamente');
        }
      });
    }
  });
});

module.exports = router
