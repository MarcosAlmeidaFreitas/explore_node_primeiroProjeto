const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");



class DiskStorage{
  async saveFile(file){
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file),
    );
    return file
  }

  async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    try{
      //função responsável por verificar se o arquivo está corrompido ou se aberto ou se está disponível
      await fs.promises.stat(filePath)
    }catch{
      return;
    }

    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage;