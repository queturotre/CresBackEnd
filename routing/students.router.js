const express = require('express');

const db = require('../db')

const router = express.Router();

// Ver todos los estudiantes
router.get('/', (req, res) => {
  db.query('SELECT * FROM estudiantes', (err, results) => {
    if (err){
      console.error(err);
      res.status(500).json({ message: 'Error recuperando estudiantes'});
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
      res.status(500).json({ message: 'Error recuperando estudiante'});
    } else if (results.length === 0) {
      res.status(404).json({ message: 'No se ha encontrado el estudiante'});
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
      res.status(500).json({ message: 'Error recuperando estudiantes'});
    } else if (results.length === 0) {
      res.status(404).json({ message: 'No se han encontrado estudiantes'});
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
      res.status(500).json({ message: 'El estudiante debe añadirse a un curso existente.'});
    } else {
      res.status(201).json({ message: 'Estudiante añadido exitosamente'});
    }
  });
});

// Actualizar estudiante
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, cres } = req.body;

  const query = `UPDATE estudiantes SET nombre = ?, apellido = ?, cres = ? WHERE id = ?`;
  db.query(query, [nombre, apellido, cres, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Estudiante actualizado con éxito'});
  });
});

// Eliminar estudiante por id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM estudiantes WHERE id = ?', [id], (err, results) => { // Por qué la variable id va en un arreglo?
    if (err){
      console.error(err);
      res.status(500).json({ message: 'Error eliminando estudiante'});
    } else if (results.affectedRows === 0){
      res.status(404).json({ message: 'Estudiante no encontrado'});
    } else {
      res.status(201).json({ message: 'Estudiante eliminado'});
    }
  });
});

module.exports = router;
