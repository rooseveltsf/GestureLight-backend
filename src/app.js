import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import routes from './routes';
import './database';
import 'dotenv/config';

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(bodyParser.json({ limit: '50mb', extended: true }));
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.use(
      '/publish',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
