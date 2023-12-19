const express = require('express');

const app = express();

//request.parms é obrigatório que os parametros estejam certos para que consiga acessar a rota. 
app.get('/message/:id/:user', (request, response)=>{
  const {id, user} = request.params;
  response.send(`O id do usuário é: ${id} \n 
  O usuário quem chamou o servidor foi: ${user}`);
});

//Com o request.query não são obrigatórios os parâmetros para que a rota seja exibida 
app.get('/users',(request, response)=>{
  const {page, limit} = request.query;

  response.send(`Página: ${page}, Mostrar ${limit} usuários`);
});

app.post('/createUser', (request, response)=>{
  response.send('Você acaba de criar um usuário');
})

const port = 3333;

app.listen(port, ()=> console.log(`Server is running on port: ${port}`));

