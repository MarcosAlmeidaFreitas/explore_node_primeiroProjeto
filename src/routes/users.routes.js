const { Router } = require("express");

const usersRouter = Router();

//request.parms é obrigatório que os parametros estejam certos para que consiga acessar a rota. 
usersRouter.get('/message/:id/:user', (request, response)=>{
  const {id, user} = request.params;
  response.send(`O id do usuário é: ${id} \n 
  O usuário quem chamou o servidor foi: ${user}`);
});

//Com o request.query não são obrigatórios os parâmetros para que a rota seja exibida 
usersRouter.get('/',(request, response)=>{
  const {page, limit} = request.query;

  response.send(`Página: ${page}, Mostrar ${limit} usuários`);
});

usersRouter.post('/createUser', (request, response)=>{
  const { name, age, email } = request.body;
  response.json(`Você acaba de criar o usuário: ${name} que possui ${age} com o email ${email}`);
});


module.exports = usersRouter;