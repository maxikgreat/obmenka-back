import Rate from 'entities/Rate';
import {ID} from '../../entities/Common';

export default abstract class IRateManager {
  abstract findRateByIdOrThrow(id: string): Promise<Rate>;

  abstract getRates(): Promise<Rate[]>;

  abstract updateRate(id: ID, buy: number, sell: number): Promise<void>;

  // abstract updateCuisine(
  //   id: string,
  //   imageId: string,
  //   nationality: string,
  // ): Promise<Rate>;
}
