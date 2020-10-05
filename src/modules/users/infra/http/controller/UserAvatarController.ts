import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService';

export default class SessionsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
