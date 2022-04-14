import { OfferDto } from "../../dto/OfferDto";

export interface IOfferService {

    getOffers(): Promise<OfferDto[]>;
}