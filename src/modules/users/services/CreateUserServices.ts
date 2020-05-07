import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserServices {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExiste = await this.userRepository.findByEmail(email);

    if (checkUserExiste) {
      throw new Error('Email address already used.');
    }

    const hashedPassord = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassord,
    });

    return user;
  }
}

export default CreateUserServices;
