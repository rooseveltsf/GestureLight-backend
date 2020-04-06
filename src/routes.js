import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PublicationController from './app/controllers/PublicationController';
import ImageController from './app/controllers/ImageController';

import authMiddleware from './app/middlewares/auth';

const routes = express.Router();
// const test = express().route();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.get('/publish', PublicationController.index);

routes.post(
  '/publish',
  upload.single('file'),
  ImageController.store,
  PublicationController.store
);
// routes.post('/publish', PublicationController.store);

routes.get('/publish/:id', PublicationController.show);

export default routes;
