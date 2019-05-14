import RestService from '../RestService.jsx';
import loginService from "../LoginService";

export default class CompanyService extends RestService {
    constructor(){
        super("/api/profiles");
    }

    consultarExistencia(email, sucesso, erro) {
        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/usuarios/consultar?email=${email}`, {
            method: "GET"
        }).then(trataFetch);
    }
    
    consultarEmail(email, sucesso, erro) {

        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/usuarios/email?email=${email}`, {
            method: "GET"
        }).then(trataFetch);
    }
    
    recuperar(id, sucesso, erro){
        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch(`api/usuarios/recuperar/${id}`, {
            method: "GET"
        }).then(trataFetch);
    }
    
    alterarSenha(codigo, usuario, sucesso, erro) {
        fetch(`api/usuarios/recuperar?codigo=${codigo}`, {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(usuario)
        }).then((resultado) => {
            if (resultado.ok) {
                sucesso();
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        });
    }

    insertImage(id, file, success, error) {
        fetch(`api/profiles/${id}/image`, {
            method: "PUT",
            body: file
        }).then((result) => {
            if (result.ok) {
                result.json().then(success)
            } else {
                result.json().then(
                    (errorResult) => error(errorResult)
                )
            }
        });
    }
    
    inserirCodigoRecuperacao(usuarioCodigo, sucesso, erro) {
        fetch(`api/usuarios/code`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(usuarioCodigo)
        }).then((resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        });
    }
    readMarketplaces(id, page, success, error) {
        console.log("AQUI SERVIÇO: ");
        console.log(page);
        let treatFetch = (result) => {
            if (result.ok) {
                result.json().then(success)
            } else {
                result.json().then(
                    (resultError) => error(resultError)
                )
            }
        };
        fetch(`api/profiles/${id}/marketplaces?page=${page}`, {
            headers: new Headers({
                'Authorization': loginService.getAuthorization(),
            }),
            method: "GET"
        }).then(treatFetch);
    }
    linkMarketplace(profileID, marketplaceID, success, error) {
        fetch(`api/profiles/${profileID}/marketplaces/${marketplaceID}`, {
            method: "PUT",
            headers: new Headers({
                'Authorization': loginService.getAuthorization(),
                'Content-Type': 'application/json'
            })
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