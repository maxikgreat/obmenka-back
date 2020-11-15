import IUserManager from 'managers/user/IUserManager';
import {Injectable} from '@nestjs/common';
import IUserStore from 'database/stores/user/IUserStore';
import {mapClientsFromDb, mapClientFromDb} from 'database/entities/Mappers';
import {ID} from 'entities/Common';
import SpoonError from 'SpoonError';

@Injectable()
export default class UserManager extends IUserManager {
  constructor(private readonly userStore: IUserStore) {
    super();
  }

  async updateClientInformation(
    id: ID,
    name: string,
    email: string,
    phoneNumber: string,
  ) {
    await this.userStore.updateClientInformation(id, name, email, phoneNumber);
  }

  async getClientById(id: ID) {
    const client = await this.userStore.getClientById(id);

    if (!client) throw new SpoonError('there is no such client');

    return mapClientFromDb(client);
  }

  async getClients() {
    const clients = await this.userStore.getClients();

    if (clients.length < 0) throw new SpoonError('no clients');

    return mapClientsFromDb(clients);
  }
}
