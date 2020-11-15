import User from './User';
import AdditionalUserInfo from './AdditionalUserInfo';

export default interface Account {
  user: User;
  info: AdditionalUserInfo;
}
