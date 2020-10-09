import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResonseDTO {
  user: User;
}

class SessionService {
  public async execute({ email, password }: RequestDTO): Promise<ResonseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('Incorrect email/password combiation');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error('Incorrect email/password combiation');
    }

    delete user.password;

    return { user };
  }
}

export default SessionService;
