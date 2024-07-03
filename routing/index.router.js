const studentsRouter = require('./students.router');
const coursesRouter = require('./courses.router');

function routerApi(app){
  app.use('/estudiantes', studentsRouter);
  app.use('/cursos', coursesRouter);
}

module.exports = routerApi;
