const { Router } = require("express");

const notesRouter = Router();

//Função para regulamentar a requisição e a reposta, como um usuário não autorizado
function myMiddleware(request, response, next){
  
  
  if(!request.body.isAdm){
    return response.status(401).json({message: "user unauthorized"});
  }

  console.log("Voce passou pelo middleware");
  next();
}





const NotesController = require('../controllers/NotesController');

const notesController = new NotesController();


notesRouter.post('/:user_id', myMiddleware, notesController.create);
//notesRouter.put('/:id', myMiddleware, notesController.update);


module.exports = notesRouter;