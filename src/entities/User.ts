import {ID} from './Common';
import {IsString} from 'class-validator';
// import LatLng from 'entities/LatLng';
import AdditionalUserInfo from 'entities/AdditionalUserInfo';

export default class User {
  constructor(
    id: string,
    image: string,
    name: string,
    additionalUserInfo: AdditionalUserInfo | undefined,
  ) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.additionalUserInfo = additionalUserInfo;
  }

  id: ID;

  @IsString()
  image: string;

  name: string;

  additionalUserInfo: AdditionalUserInfo | undefined;
}
