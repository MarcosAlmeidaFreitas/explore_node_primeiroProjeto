class UserController{
/*
  A classe geralmente possui 5 Funções que são:
  
  * Função index - Utiliza o método GET para LISTAR os registros.
  * Função show - Utiliza o método get para EXIBIR um registro específico.
  * Função create - Utiliza o método POST para CRIAR um novo registro
  * Função update - Utiliza o método PUT para ATUALIZAR um registro.
  * Função delete - Utiliza o método DELETE para REMOVER um registro.
*/

  create(request, response){
    const { name, age, email } = request.body;
    response.status(201).json(`Você acaba de criar o usuário: ${name}. Que possui ${age} anos e seu é email ${email}`);
  }
}

module.exports = UserController;