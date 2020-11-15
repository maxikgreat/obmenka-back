import User from 'database/entities/User';
import {ID} from 'entities/Common';
import Client from 'database/entities/Client';

export interface GetCouriersFilter {
  withoutActiveOrders?: true;
}

export default abstract class IUserStore {
  abstract createUser(user: Partial<User>): Promise<User>;

  abstract getUser(userId: ID): Promise<User | undefined>;

  abstract getUserOrFail(userId: ID): Promise<User>;

  abstract createClientIfNotExists(userId: ID): Promise<Client>;

  abstract getClientOrThrow(userId: ID): Promise<Client>;

  abstract updateClientInformation(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
  ): Promise<void>;


  abstract getClientById(id: string): Promise<Client | undefined>;

  abstract getClients(): Promise<Client[]>;

  abstract updateUser(
    userId: ID,
    data: {
      name: string;
      email: string;
      phoneNumber: string;
    },
  ): Promise<void>;

  abstract updateUserImage(userId: ID, imageId: string): Promise<void>;
}
