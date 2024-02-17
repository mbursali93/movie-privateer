import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IGoogleProfile } from 'src/interfaces/profile.google';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getUserProfile() {
    return 'user';
  }

  async validateUser(profile: IGoogleProfile) {
    const { email } = profile;
    const user = await this.userRepository.findOneBy({ email });
    if (user) return user;

    const savedUser = await this.userRepository.create(profile);
    return await this.userRepository.save(savedUser);
  }
}
