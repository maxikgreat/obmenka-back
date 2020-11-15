import {Field, ID, ObjectType} from '@nestjs/graphql';
// import LatLng from 'graphql/entities/address/LatLng';
import AdditionalUserInfo from './AdditionalUserInfo';

@ObjectType()
export default class User {
  constructor(
    id: string,
    image: string,
    name: string,
    additionalUserInfo?: AdditionalUserInfo,
  ) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.additionalUserInfo = additionalUserInfo;
  }

  @Field(() => ID)
  id: string;

  @Field(() => String, {nullable: true})
  image: string;

  @Field(() => String)
  name: string;

  @Field(() => AdditionalUserInfo, {nullable: true})
  additionalUserInfo: AdditionalUserInfo | undefined;
}
