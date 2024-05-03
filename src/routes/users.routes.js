const { Router } = require("express");
const multer = require('multer');
const uploadConfig = require("../configs/upload");

const usersRouter = Router();
const upload = multer(uploadConfig.MULTER);

//Exemplo de Middleware

//Função para regulamentar a requisição e a reposta, como um usuário não autorizado, 
// function myMiddleware(request, response, next){
  
  
//   if(!request.body.isAdm){
//     return response.status(401).json({message: "user unauthorized"});
//   }

//   console.log("Voce passou pelo middleware");
//   next();
// }

const UsersController = require('../controllers/UsersController');
const UserAvatarController = require('../controllers/UserAvatarController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

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

usersRouter.post('/',  usersController.create);
usersRouter.put('/', ensureAuthenticated, usersController.update);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRouter;