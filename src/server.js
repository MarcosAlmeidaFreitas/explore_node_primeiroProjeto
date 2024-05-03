//Utilizando a biblioteca async errors
require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError.js");

const express = require('express');
const uploadConfig = require('./configs/upload.js');

const routes = require("./routes/index.js");

migrationsRun();

const app = express();


// Importante se utiliza o json no projeto para requisição ou para resposta deve se utiliza-lo da seguinte forma
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
// Fazendo o app utilizar o arquivo de  rotas no caso o index.js
app.use(routes);


//Tratando sobre o erro do servidor e erro do cliente.
app.use((error, request, response, next) =>{
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "erro", 
    message: "internal server error"
  });
});

const port = 3333;

app.listen(port, ()=> console.log(`Server is running on port: ${port}`));

