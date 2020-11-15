import {Field, ObjectType} from '@nestjs/graphql';
import User from '../user/User';
import AdditionalUserInfo from '../user/AdditionalUserInfo';

@ObjectType()
export default class Account {
  @Field(() => User)
  user: User;

  @Field(() => AdditionalUserInfo)
  info: AdditionalUserInfo;

  constructor(user: User, info: AdditionalUserInfo) {
    this.user = user;
    this.info = info;
  }
}
