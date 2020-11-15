import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import IRateManager from 'managers/rate/IRateManager';
import Rate from 'graphql/entities/rate/Rate';
import {mapRatesToGQL, mapRateToGQL} from 'graphql/entities/Mappers';
import Roles from '../../enhancers/decorators/Roles';

@Resolver()
export default class RateResolver {
  constructor(private readonly rateManager: IRateManager) {}

  @Query(() => Rate)
  async rateById(@Args({name: 'id', type: () => String}) id: string) {
    return mapRateToGQL(await this.rateManager.findRateByIdOrThrow(id));
  }

  @Query(() => [Rate], {name: 'rates'})
  async getRates() {
    return mapRatesToGQL(await this.rateManager.getRates());
  }

  @Mutation(() => Boolean)
  async updateRate(
    @Args({name: 'id', type: () => ID}) id: string,
    @Args('buy') buy: number,
    @Args('sell') sell: number,
  ) {
    await this.rateManager.updateRate(id, buy, sell);

    return true;
  }

  // @Mutation(() => Rate)
  // async updateCuisine(
  //   @Args('id') id: string,
  //   @Args('imageId') imageId: string,
  //   @Args('nationality') nationality: string,
  // ) {
  //   return mapCuisineToGQL(
  //     await this.rateManager.updateCuisine(id, imageId, nationality),
  //   );
  // }
}
