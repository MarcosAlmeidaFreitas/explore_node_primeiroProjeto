const express = require('express');

const app = express();

app.get('/message/:id/:user', (request, response)=>{
  const {id, user} = request.params;
  response.send(`O id do usuário é: ${id} \n 
  O usuário quem chamou o servidor foi: ${user}`);
});

const port = 3333;

app.listen(port, ()=> console.log(`Server is running on port: ${port}`));

