import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ICreateUserResponse } from 'src/user/interfaces/response.interface';
import { IUserCredentials } from '../interfaces/user.interface';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async findOne(
    email: string,
    fields: (keyof UserEntity)[],
  ): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      select: fields,
      where: { email },
    });
  }

  public async findOneBy(id: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ id });
  }

  public async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  public async create(
    userPayload: IUserCredentials,
  ): Promise<ICreateUserResponse> {
    const user = await this.userRepository.save(userPayload);
    return omit(user, ['password']);
  }
}
