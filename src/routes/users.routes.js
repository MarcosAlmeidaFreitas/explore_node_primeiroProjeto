const { Router } = require("express");

const usersRouter = Router();


function myMiddleware(request, response, next){
  console.log("Voce passou pelo middleware");
  
  if(!request.body.isAdm){
    return response.status(401).json({message: "user unauthorized"});
  }

  next();
}





const UserController = require('../controllers/UserController');

const userController = new UserController();

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

usersRouter.post('/createUser', myMiddleware, userController.create);


module.exports = usersRouter;