import React, { Component } from "react";
import MarketplaceService from "../../services/MarketplaceServices/MarketplaceService.jsx";
import Loading from "../../components/Loading/Loading.jsx";

class MarketplaceLogin extends Component {
    constructor(props) {
        super(props);

        this.MarketplaceService = new MarketplaceService();
    }

    getUrlParams(search) {
        let hashes = search.slice(search.indexOf('?') + 1).split('&')
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=')
            return Object.assign(params, { [key]: decodeURIComponent(val) })
        }, {})
    }

    updateAuthorization() {
        let data = JSON.parse(sessionStorage.getItem("marketplace_authentication"));
        this.MarketplaceService.updateAuthorization(data.profile_id, data.id, this.getUrlParams(window.location.href).code,
            (success) => {
                console.log(success);
                window.close();
            }, (error) => {
                console.log("Erro!");
                console.log(error);
                window.close();
            }
        )
    }

    render() {
        if (this.getUrlParams(window.location.href).code !== null && sessionStorage.getItem("marketplace_authentication") !== null) {
            this.updateAuthorization();
            sessionStorage.removeItem("marketplace_authentication");
        } else {
            window.close();
        }

        return <Loading />
    }
} export default MarketplaceLogin;