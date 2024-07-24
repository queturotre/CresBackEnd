const express = require('express');

const db = require('../db');

const router = express.Router();

// Ver cursos
router.get('/', (req, res) => {
  db.query('SELECT * FROM cursos', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error recuperando cursos');
    } else {
      res.json(results);
    }
  });
});

// Ver curso por nrc
router.get('/:nrc', (req, res) => {
  const { nrc } = req.params;
  db.query('SELECT * FROM cursos WHERE nrc = ?', [nrc], (err, results) => {
    if (err){
      res.status(500).send("Error encontrando curso");
    } else if (results.length === 0){
      res.status(400).send("No se encontró el curso");
    } else {
      res.status(200).json(results);
    }
  });
});

// Añadir curso
router.post('/', (req, res) => {
  const { nrc, grado, curso } = req.body;
  db.query('INSERT INTO cursos (nrc, grado, curso) VALUES (?, ?, ?)', [nrc, grado, curso], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: `Error añadiendo curso ${err}`});
    } else {
      res.status(201).json({ message: 'Curso añadido exitosamente'});
    }
  });
});

// Eliminar curso
router.delete('/:nrc', (req, res) => {
  const { nrc } = req.params;
  db.query('DELETE FROM estudiantes WHERE nrc = ?', [nrc], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error eliminando estudiantes'});
    } else {
      db.query('DELETE FROM cursos WHERE nrc = ?', [nrc], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error eliminando curso'});
        } else if (results.affectedRows === 0) {
          res.status(404).json({ message: 'Curso no encontrado'});
        } else {
          res.status(200).json({ message: 'Curso eliminando exitosamente'});
        }
      });
    }
  });
});

module.exports = router
