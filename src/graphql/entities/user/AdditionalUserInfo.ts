import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class AdditionalUserInfo {
  constructor(phoneNumber: string, email: string, isAdmin: boolean) {
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.isAdmin = isAdmin;
  }

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  isAdmin: boolean;
}
