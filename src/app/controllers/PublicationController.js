import Publication from '../models/Publication';
import User from '../models/User';
import Image from '../models/Image';

class PublicationController {
  async index(req, res, next) {
    const userExists = await User.findByPk(req.userId);
    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }
    try {
      const count = await Publication.findAll();

      // const { page = 1 } = req.query;
      const publication = await Publication.findAll({
        include: [
          {
            model: Image,
            as: 'image',
            attributes: ['url', 'path'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['name', 'endereco', 'email'],
          },
        ],
        // limit: 5,
        // offset: (page - 1) * 5,
      });

      res.header('X-Total-count', count.length);

      return res.json(publication);
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Erro na listagem das publicações.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const userExists = await User.findByPk(req.userId);
      if (!userExists) {
        return res.status(400).json({ error: 'Usuário não existe' });
      }

      const publication = await Publication.findOne({ where: { id } });

      if (!publication) {
        return res.status(400).json({ error: 'Publicação não existe' });
      }

      return res.json(publication);
    } catch (err) {
      return res.status(400).json({ error: 'Erro na pesquisa' });
    }
  }

  async store(req, res) {
    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existe.' });
    }
    try {
      const { title, description, address, latitude, longitude } = req.body;

      const { imageId } = req;

      const publication = await Publication.create({
        title,
        description,
        address_post: address,
        latitude,
        longitude,
        user_id: req.userId,
        image_id: imageId,
      });

      return res.json(publication);
    } catch (err) {
      return res.status(400).json({ error: 'Erro na criação do post.' });
    }
  }
}

export default new PublicationController();
