import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserController from '../controller/UserCreateController';
import UserAvatarController from '../controller/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

const userAvatarController = new UserAvatarController();
const userController = new UserController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
