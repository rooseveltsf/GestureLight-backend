import Image from '../models/Image';
import User from '../models/User';

class ImageController {
  async store(req, res, next) {
    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existe.' });
    }

    try {
      const { originalname: name, filename: path } = req.file;

      const { id } = await Image.create({ name, path });

      req.imageId = id;
      return next();
    } catch (err) {
      return res.status(400).json({ error: 'Erro no carregamento da imagem.' });
    }
  }
}

export default new ImageController();
