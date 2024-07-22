import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { IUserResponse } from 'src/user/interfaces/response.interface';
import { IUserCredentials } from 'src/user/interfaces/user.interface';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(
    email: string,
    fields: (keyof UserEntity)[],
  ): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneOrFail({
      select: fields,
      where: { email },
    });
  }

  async findOneById(
    id: string,
    throwOnFail: boolean = false,
  ): Promise<UserEntity | undefined> {
    if (throwOnFail) return await this.userRepository.findOneByOrFail({ id });
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(userPayload: IUserCredentials): Promise<IUserResponse> {
    const user = await this.userRepository.save(userPayload);
    return omit(user, ['password']);
  }
}
