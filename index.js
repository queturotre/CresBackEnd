const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors');
const routerApi = require('./routing/index.router');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, ()=>{
  console.log("Puerto "+port);
});

app.use(morgan("dev"))

routerApi(app);
