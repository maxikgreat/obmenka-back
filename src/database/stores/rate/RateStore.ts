import IRateStore from './IRateStore';
import {InjectRepository} from '@nestjs/typeorm';
import Rate from 'database/entities/Rate';
import {Repository, In} from 'typeorm';

export default class RateStore extends IRateStore {
  constructor(
    @InjectRepository(Rate)
    private readonly repository: Repository<Rate>,
  ) {
    super();
  }

  async findRateById(id: string) {
    return this.repository.findOneOrFail(id);
  }

  async getRates() {
    return this.repository.find();
  }

  async getRatesByIds(ids: string[]) {
    return this.repository.find({
      where: {id: In(ids)},
    });
  }

  async updateRate(id: string, buy: number, sell: number) {
    const rate = await this.findRateById(id);

    await this.repository.update(rate.id, {
      buy,
      sell,
    });
  }

  // async updateCuisine(id: string, nationality: string) {
  //   await this.repository.update(id, {
  //     nationality,
  //   });
  //
  //   return this.findRateById(id);
  // }
}
