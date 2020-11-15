import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
export default class Rate {
  constructor(
    id: string,
    name: string,
    buy: number,
    sell: number,
    type: string,
    isCross: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.buy = buy;
    this.sell = sell;
    this.type = type;
    this.isCross = isCross;
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Number, {nullable: false})
  buy: number;

  @Field(() => Number, {nullable: false})
  sell: number;

  @Field(() => String)
  type: string;

  @Field(() => Boolean, {nullable: true})
  isCross: boolean;
}
