import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UserController from '../controller/UsersController';
import UsersAvatarController from '../controller/UsersAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const usersAvatarController = new UsersAvatarController();

usersRouter.post('/', userController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
