import Rate from 'database/entities/Rate';

export default abstract class IRateStore {
  abstract findRateById(id: string): Promise<Rate | undefined>;

  abstract getRates(): Promise<Rate[]>;

  abstract getRatesByIds(ids: string[]): Promise<Rate[]>;

  abstract updateRate(id: string, buy: number, sell: number): Promise<void>;

  // abstract updateCuisine(id: string, imageId: string, nationality: string): Promise<Rate>;
}
