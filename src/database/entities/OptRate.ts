import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class OptRate {
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

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float', {nullable: false})
  buy: number;

  @Column('float', {nullable: false})
  sell: number;

  @Column()
  type: string;

  @Column({nullable: true})
  isCross: boolean;
}
