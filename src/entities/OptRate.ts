import {ID} from './Common';

export default interface OptRate {
  id: ID;
  name: string;
  buy: number;
  sell: number;
  type: string;
  isCross: boolean;
}
