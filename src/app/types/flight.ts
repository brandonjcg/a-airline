import { IFlight } from '@/models/Flight';

export interface IFlightsAdmin extends IFlight {
  isDeleteable: boolean;
}
