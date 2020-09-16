import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const SessionsUser = container.resolve(AuthenticateUserService);

    const userData = await SessionsUser.execute({
      email,
      password,
    });

    return response.json(userData);
  }
}
