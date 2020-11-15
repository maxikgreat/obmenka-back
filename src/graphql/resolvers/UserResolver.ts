import {Args, Mutation, Query, Resolver, ID} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import AuthGuard from 'enhancers/guards/AuthGuard';
import Client from 'graphql/entities/user/Client';
import Roles from 'enhancers/decorators/Roles';
import IUserManager from 'managers/user/IUserManager';
import {mapClientsToGQL, mapClientToGQL} from 'graphql/entities/Mappers';
import SpoonError from 'SpoonError';

@Resolver()
@UseGuards(AuthGuard)
export default class UserResolver {
  constructor(private readonly userManager: IUserManager) {}

  @Mutation(() => Boolean)
  @Roles('Admin')
  async updateClientInformation(
    @Args({name: 'id', type: () => ID}) id: string,
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('phoneNumber') phoneNumber: string,
  ) {
    await this.userManager.updateClientInformation(id, name, email, phoneNumber);

    return true;
  }

  @Query(() => [Client], {name: 'clients'})
  @Roles('Admin')
  async getClients() {
    return mapClientsToGQL(await this.userManager.getClients());
  }

  @Query(() => Client, {name: 'clientById'})
  @Roles('Admin')
  async getClientById(@Args({name: 'clientId', type: () => ID}) clientId: string) {
    const client = await this.userManager.getClientById(clientId);
    if (!client) throw new SpoonError('Client not found');
    return mapClientToGQL(client);
  }
}
