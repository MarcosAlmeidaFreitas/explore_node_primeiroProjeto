const { hashSync, compareSync, genSaltSync } = require('bcryptjs');
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

const salt = genSaltSync(8);

class UsersController {
  /*
    A classe geralmente possui 5 Funções que são:
    
    * Função index - Utiliza o método GET para LISTAR os registros.
    * Função show - Utiliza o método get para EXIBIR um registro específico.
    * Função create - Utiliza o método POST para CRIAR um novo registro
    * Função update - Utiliza o método PUT para ATUALIZAR um registro.
    * Função delete - Utiliza o método DELETE para REMOVER um registro.
  */

  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if (checkUserExists) {
      throw new AppError("Este email já está em uso.");
    }

    const hashedPassword = hashSync(password, salt);

    await database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", name, email, hashedPassword);

    // if(!name){
    //   throw new AppError("Nome é obrigatório");
    // }


    return response.status(201).json(`Usuário: ${name} criado`);
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    console.log(user_id);

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?) ", [user_id]);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso");
    }

    //se caso existir algo na variável name o conteúdo dela será atribuido, caso não tenha nada seja null vai ser atribuído o que estiver em user.name
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
    }

    if (password && old_password) {
      const checkOldPassword = await compareSync(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = hashSync(password, salt);
    }

    await database.run(`
      UPDATE users SET 
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json();
  }
}

module.exports = UsersController;