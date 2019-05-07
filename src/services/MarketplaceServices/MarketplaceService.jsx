import RestService from "../RestService";

export default class MarketplaceService extends RestService {
    constructor(){
        super("/api/profiles/marketplaces/available/");
    }
}
