const { Router } = require("express");

const usersRouter = Router();

//Função para regulamentar a requisição e a reposta, como um usuário não autorizado
function myMiddleware(request, response, next){
  
  
  if(!request.body.isAdm){
    return response.status(401).json({message: "user unauthorized"});
  }

  console.log("Voce passou pelo middleware");
  next();
}





const UsersController = require('../controllers/UsersController');

const usersController = new UsersController();

//request.parms é obrigatório que os parâmetros estejam certos para que consiga acessar a rota. 
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

usersRouter.post('/', myMiddleware, usersController.create);
usersRouter.put('/:id', myMiddleware, usersController.update);


module.exports = usersRouter;