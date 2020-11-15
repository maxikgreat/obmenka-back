import User from '../../entities/User';
import GQLUser from './user/User';
import Client from '../../entities/Client';
import GQLClient from './user/Client';
import AdditionalUserInfo from '../../entities/AdditionalUserInfo';
import GQLAdditionalUserInfo from './user/AdditionalUserInfo';
import Account from '../../entities/Account';
import GQLAccount from './account/Account';
import Rate from '../../entities/Rate';
import GQLRate from './rate/Rate';

export const mapAdditionalUserInfoToGQL = (
  additionalInfo: AdditionalUserInfo,
): GQLAdditionalUserInfo => ({
  phoneNumber: additionalInfo.phoneNumber,
  email: additionalInfo.email,
  isAdmin: additionalInfo.isAdmin,
});

export const mapUserToGQL = (user: User): GQLUser => {
  return {
    id: user.id,
    image: user.image,
    name: user.name,
    additionalUserInfo: user.additionalUserInfo
      ? mapAdditionalUserInfoToGQL(user.additionalUserInfo)
      : undefined,
  };
};

export const mapClientToGQL = (client: Client): GQLClient => ({
  id: client.id,
  user: mapUserToGQL(client.user),
});

export const mapClientsToGQL = (clients: Client[]): GQLClient[] =>
  clients.map(mapClientToGQL);

export const mapAccountToGQL = (account: Account): GQLAccount => ({
  user: mapUserToGQL(account.user),
  info: mapAdditionalUserInfoToGQL(account.info),
});

export const mapRateToGQL = (rate: Rate): GQLRate => ({
  id: rate.id,
  name: rate.name,
  buy: rate.buy,
  sell: rate.sell,
  type: rate.type,
  isCross: rate.isCross,
});

export const mapRatesToGQL = (rates: Rate[]): GQLRate[] => {
  return rates.map(mapRateToGQL);
};
