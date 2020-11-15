import User from '../../entities/User';
import DbUser from './User';
import DbRate from './Rate';
import DbOptRate from './OptRate';
import Rate from '../../entities/Rate';
import DbClient from './Client';
import Client from '../../entities/Client';
import Account from '../../entities/Account';
import AdditionalUserInfo from 'entities/AdditionalUserInfo';
import SpoonError from '../../SpoonError';
import OptRate from '../../entities/OptRate';

export const mapAdditionalUserInfoFromDb = (user: DbUser): AdditionalUserInfo => ({
  email: user.email,
  phoneNumber: user.phoneNumber,
  isAdmin: user.isAdmin,
});

export const mapUserFromDb = (
  user: DbUser,
  addAdditionalInfo: boolean = false,
): User => ({
  id: user.id,
  image: user.image ? user.image.id : user.imageId,
  name: user.name,
  additionalUserInfo: addAdditionalInfo ? mapAdditionalUserInfoFromDb(user) : undefined,
});

export const mapClientFromDb = (client: DbClient): Client => {
  if (!client.user) throw new SpoonError('Client user data not exist');

  return {
    id: client.id,
    user: mapUserFromDb(client.user, true),
  };
};

export const mapClientsFromDb = (clients: DbClient[]): Client[] =>
  clients.map(mapClientFromDb);

export const mapRateFromDb = (rate: DbRate): Rate => ({
  id: rate.id,
  name: rate.name,
  buy: rate.buy,
  sell: rate.sell,
  type: rate.type,
  isCross: rate.isCross,
});

export const mapRatesFromDb = (rates: DbRate[]): Rate[] => {
  return rates.map(mapRateFromDb);
};

export const mapOptRateFromDb = (rate: DbOptRate): OptRate => ({
  id: rate.id,
  name: rate.name,
  buy: rate.buy,
  sell: rate.sell,
  type: rate.type,
  isCross: rate.isCross,
});

export const mapAccountFromDB = (account: DbUser): Account => ({
  user: mapUserFromDb(account),
  info: mapAdditionalUserInfoFromDb(account),
});
