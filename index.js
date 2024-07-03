const express = require('express');
const routerApi = require('./routing/index.router');
const morgan = require("morgan");

const app = express();
const port = 3000;

app.listen(port, ()=>{
  console.log("Puerto "+port);
});

app.use(morgan("dev"))

routerApi(app);
