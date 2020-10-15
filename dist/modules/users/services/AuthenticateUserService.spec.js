"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeHashProvider;
let authenticateUser;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUser = new _AuthenticateUserService.default(fakeUserRepository, fakeHashProvider);
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    });
    const response = await authenticateUser.execute({
      email: 'john@example.com',
      password: '123456'
    });
    await expect(response).toHaveProperty('token');
    await expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with non existing user', async () => {
    await expect(authenticateUser.execute({
      email: 'john@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to authenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    });
    await expect(authenticateUser.execute({
      email: 'john@example.com',
      password: '12345621'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});