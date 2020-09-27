import { Request, Response } from 'express';
import { container } from 'tsyringe';

import resetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPassword {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = container.resolve(resetPasswordService);

    await resetPassword.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
