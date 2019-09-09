import RestService from '../RestService.jsx';
import loginService from '../LoginService.jsx';

export default class AdsService extends RestService {
    constructor(){
        super('/api/profiles/marketplaces/ads/');
    }

    categoryNavSearch(search, success, error) {
        let category = search.category?('&category='+search.category_from):'';
        fetch(`api/profiles/marketplaces/ads/category/search?title=${search.title}${category}`, {
            method: 'GET',
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

    categorySearch(search, success, error) {
        fetch(`api/profiles/marketplaces/ads/category?category=${search.category}&name=${search.name}`, {
            method: 'GET',
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
