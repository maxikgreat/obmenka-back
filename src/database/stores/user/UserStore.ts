import {Injectable} from '@nestjs/common';
import {InjectRepository, InjectConnection} from '@nestjs/typeorm';
import {Repository, Connection} from 'typeorm';
import IUserStore, {GetCouriersFilter} from './IUserStore';
import User from '../../entities/User';
import {ID} from 'entities/Common';
import SpoonError from 'SpoonError';
import Client from 'database/entities/Client';

@Injectable()
export default class UserStore implements IUserStore {
  constructor(
    @InjectConnection()
    private connection: Connection,
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async getUser(userId: ID) {
    return this.repository.findOneOrFail({
      where: {id: userId},
    });
  }

  async getUserOrFail(userId: ID) {
    const user = await this.getUser(userId);
    if (!user) throw new SpoonError('User not found');
    return user;
  }

  async createUser(user: Partial<User>) {
    const newUser = this.repository.create({...user});
    await this.repository.insert(newUser);
    return newUser;
  }

  async createClientIfNotExists(userId: string) {
    const user = {id: userId};
    const client = await this.clientRepository.findOne(
      {user},
      {
        loadRelationIds: true,
      },
    );
    if (client) return client;

    {
      const client = this.clientRepository.create({user});
      await this.clientRepository.insert(client);
      return client;
    }
  }

  async getClientOrThrow(userId: ID) {
    return this.clientRepository.findOneOrFail({user: {id: userId}});
  }

  async getClientById(id: string) {
    return this.clientRepository.findOneOrFail({id}, {relations: ['user']});
  }

  async updateClientInformation(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
  ) {
    const client = await this.getClientById(id);

    await this.repository.update(client.userId, {
      name,
      email,
      phoneNumber,
    });
  }

  async getClients() {
    return this.clientRepository.find({relations: ['user']});
  }

  async updateUser(
    userId: string,
    data: {
      name: string;
      email: string;
      phoneNumber: string;
      allowNotifications: boolean;
    },
  ) {
    await this.repository.update(userId, data);
  }

  async updateUserImage(userId: string, imageId: string) {
    await this.repository.update(userId, {
      imageId,
    });
  }
}
