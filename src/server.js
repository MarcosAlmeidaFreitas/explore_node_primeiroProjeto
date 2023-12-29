//Utilizando a biblioteca async errors
require("express-async-errors");

const AppError = require("./utils/AppError.js");

const express = require('express');

const routes = require("./routes/index.js");

const app = express();

// Importante se utiliza o json no projeto para requisição ou para resposta deve se utiliza-lo da seguinte forma
app.use(express.json());
// Fazendo o app utilizar o arquivo de  rotas no caso o index.js
app.use(routes);
app.use((error, request, response, next) =>{
  
})

const port = 3333;

app.listen(port, ()=> console.log(`Server is running on port: ${port}`));

