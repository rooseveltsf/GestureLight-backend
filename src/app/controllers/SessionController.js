import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }
    const { id, name, endereco } = user;

    return res.json({
      user: {
        id,
        name,
        endereco,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
