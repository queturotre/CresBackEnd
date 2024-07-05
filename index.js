const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors');
const routerApi = require('./routing/index.router');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, ()=>{
  console.log("Puerto "+port);
});

app.use(morgan("dev"))

routerApi(app);
