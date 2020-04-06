import Sequelize from 'sequelize';

import User from '../app/models/User';
import Publication from '../app/models/Publication';
import Image from '../app/models/Image';

import databaseConfig from '../config/database';

const models = [User, Publication, Image];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
