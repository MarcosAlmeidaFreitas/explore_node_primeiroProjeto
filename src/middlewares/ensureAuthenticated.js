const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');


function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("JWT Token uninformed", 401);
  }

  const [, token] = authHeader.split(" ");

  try{
    //pegando a propriedade sub da verificação e renomeando para user_id
    const {sub: user_id} = verify(token, authConfig.jwt.secret);
    
    request.user = {
      id: Number(user_id)
    }
    return next();
  }catch{
    throw new AppError("JWT inválido", 401);
  }
}


module.exports = ensureAuthenticated;