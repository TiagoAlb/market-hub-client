import RestService from "../RestService.jsx";
import loginService from "../LoginService.jsx";

export default class AdsService extends RestService {
    constructor(){
        super("/api/profiles/marketplaces/ads/");
    }

    categorySearch(search, success, error) {
        fetch(`api/profiles/marketplaces/ads/category/search?title=${search.title}`, {
            method: "GET",
            headers: new Headers({
                'Authorization': loginService.getAuthorization(),
                'Content-Type': 'application/json'
            })
        }).then((result) => {
            if (result.ok) {
                result.json().then(success)
            } else {
                result.json().then(
                    (resultError) => error(resultError)
                )
            }
        });
    }
}
