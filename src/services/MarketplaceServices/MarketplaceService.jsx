import RestService from "../RestService.jsx";
import loginService from "../LoginService.jsx";

export default class MarketplaceService extends RestService {
    constructor() {
        super("/api/profiles/marketplaces/available/");
    }

    updateAuthorization(profileID, marketplaceID, code, success, error) {
        fetch(`api/profiles/${profileID}/marketplaces/${marketplaceID}/authorization`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': loginService.getAuthorization(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(code)
        }).then((result) => {
            if (result.ok) {
                success();
            } else {
                result.json().then(
                    (resultError) => error(resultError)
                )
            }
        });
    }
}
