const { Router } = require("express");

const notesRouter = Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

//Função para regulamentar a requisição e a reposta, como um usuário não autorizado, exemplificando um middlewares
// function myMiddleware(request, response, next){
  
  
//   if(!request.body.isAdm){
//     return response.status(401).json({message: "user unauthorized"});
//   }

//   console.log("Voce passou pelo middleware");
//   next();
// }





const NotesController = require('../controllers/NotesController');

const notesController = new NotesController();

notesRouter.use(ensureAuthenticated);

notesRouter.post('/', notesController.create);
notesRouter.get('/:id', notesController.show);
notesRouter.delete('/:id', notesController.delete);
notesRouter.get('/', notesController.index);
//notesRouter.put('/:id', myMiddleware, notesController.update);


module.exports = notesRouter;