"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeMailProvider;
let fakeUserTokensRepository;
let sendForgotPasswordEmailService;
describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    sendForgotPasswordEmailService = new _SendForgotPasswordEmailService.default(fakeUserRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it('should be able to recover the password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: 'Murylo',
      email: 'murylocesar@gmail.com',
      password: '123454'
    });
    await sendForgotPasswordEmailService.execute({
      email: 'murylocesar@gmail.com'
    });
    await expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmailService.execute({
      email: 'john@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgat password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUserRepository.create({
      name: 'Murylo',
      email: 'murylocesar@gmail.com',
      password: '123454'
    });
    await sendForgotPasswordEmailService.execute({
      email: 'murylocesar@gmail.com'
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});