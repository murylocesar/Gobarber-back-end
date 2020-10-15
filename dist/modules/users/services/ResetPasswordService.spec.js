"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeUserTokensRepository;
let resetPasswordService;
let fakeHashProvider;
describe('ResetPasswordServer', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPasswordService = new _ResetPasswordService.default(fakeUserRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Murylo',
      email: 'murylocesar@gmail.com',
      password: '123454'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const gererateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPasswordService.execute({
      password: '121221',
      token
    });
    const updateUser = await fakeUserRepository.findById(user.id);
    expect(gererateHash).toHaveBeenCalledWith('121221');
    expect(updateUser === null || updateUser === void 0 ? void 0 : updateUser.password).toBe('121221');
  });
  it('should be able to reset the password with non-existing token', async () => {
    await expect(resetPasswordService.execute({
      token: 'non-existing-token',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to reset the password with non-existing user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('non-existing-user');
    await expect(resetPasswordService.execute({
      token,
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'Murylo',
      email: 'murylocesar@gmail.com',
      password: '123454'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customData = new Date();
      return customData.setHours(customData.getHours() + 3);
    });
    await expect(resetPasswordService.execute({
      password: '121221',
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});