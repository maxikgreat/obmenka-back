import IRateManager from 'managers/rate/IRateManager';
import IRateStore from 'database/stores/rate/IRateStore';
import Rate from 'entities/Rate';
import {mapRateFromDb, mapRatesFromDb} from 'database/entities/Mappers';
import {Injectable} from '@nestjs/common';
import SpoonError from 'SpoonError';
import {ID} from '../../entities/Common';

@Injectable()
export default class RateManager extends IRateManager {
  constructor(private rateStore: IRateStore) {
    super();
  }

  async findRateByIdOrThrow(id: string): Promise<Rate> {
    const cuisine = await this.rateStore.findRateById(id);
    if (!cuisine) throw new SpoonError('Rate not found');
    return mapRateFromDb(cuisine);
  }

  async getRates(): Promise<Rate[]> {
    return mapRatesFromDb(await this.rateStore.getRates());
  }

  async updateRate(id: ID, buy: number, sell: number) {
    await this.rateStore.updateRate(id, buy, sell);
  }
  // async updateCuisine(
  //   id: string,
  //   imageId: string,
  //   nationality: string,
  // ): Promise<Rate> {
  //   return mapCuisineFromDb(
  //     await this.cuisineStore.updateCuisine(id, imageId, nationality),
  //   );
  // }
}
