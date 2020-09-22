import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmailService.spec', () => {
  it('should be able to recover the password using email', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
    );

    await fakeUserRepository.create({
      name: 'Murylo',
      email: 'murylocesar@gmail.com',
      password: '123454',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'john@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
