import User from '../infra/typeorm/entities/User';
import ICreatUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreatUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
