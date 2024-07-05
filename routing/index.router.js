const express = require('express');

const studentsRouter = require('./students.router');
const coursesRouter = require('./courses.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api', router);
  router.use('/estudiantes', studentsRouter);
  router.use('/cursos', coursesRouter);
}

module.exports = routerApi;
