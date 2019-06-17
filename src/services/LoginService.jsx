import base64 from "base-64/base64.js";

class LoginService {
    login(emailAddress, password, success, error) {
        this.emailAddress = emailAddress;
        this.password = password;
        fetch(`api/profiles/login`, {
                headers: new Headers({
                    'Authorization': this.getAuthorization()
                }),
                method: "GET"
            }
        ).then((response) => {
            if (response.ok) {
                console.log(response);
                response.json().then((data) => {
                    this.token = response.headers.get("token");
                    sessionStorage.setItem("token", this.token);
                    this.data = data;
                    success(data);
                })

            } else {
                response.json().then(error);
            }
        }).catch(error);
    }

    validateLogin(success) {
        fetch(`api/profiles/validateLogin`, {
                headers: new Headers({
                    'Authorization': "Bearer " + sessionStorage.getItem("token")
                }),
                method: "GET"
            }
        ).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    this.data = data;
                    this.token = sessionStorage.getItem("token");
                    success();
                })
            } else {
                sessionStorage.removeItem("token");
                console.log("error " + response.json().then());
            }
        }).catch();
    }

    closeSession() {
        sessionStorage.removeItem("token");
    }

    getAuthorizationGet() {
        return "token=" + this.token;
    }

    getAuthorization() {
        if (this.token)
            return "Bearer " + this.token;
        else
            return "Basic " + base64.encode(this.emailAddress + ":" + this.password);
    }

    logged() {
        if (this.data)
            return this.data;
        else
            return false;
    }

    getUser() {
        return this.data.id;
    }
}

let loginService = new LoginService();
export default loginService;