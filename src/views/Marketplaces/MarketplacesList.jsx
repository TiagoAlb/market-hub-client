import React, { Component } from "react";
import ImageCard from "../../components/ImageCard/ImageCard";
import Logo from "../../assets/img/ml.jpg";
import CustomButton from "../../components/CustomButton/CustomButton";
import Screen from "Useful/Screen.jsx";
import MarketplaceService from "../../services/MarketplaceServices/MarketplaceService";
import CompanyService from "../../services/CompanyServices/CompanyService.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Row, Col, 
    Form, FormGroup, Label, 
    Input, FormText, Alert,
    Button, Modal, ModalHeader, 
    ModalBody, ModalFooter } from "reactstrap";

export default class MarketplacesList extends Component {
    constructor(props) {
        super(props);
        this.state = {           
            items: Array.from({length: 0}),
            message: "Carregando...",
            pageable: {
                page: 0,
                totalPages: 0,
                totalElements: 0
            },  
            hasMore: true
        };
        this.fetchMoreData.call(this);
        this.CompanyService = new CompanyService();
    }

    fetchMoreData = () => {
        if (this.state.pageable.page!==0 && this.state.pageable.page >= this.state.pageable.totalPages) {
            this.setState({hasMore: false});
            return;
        }
        setTimeout(() => {
            this.nextPage.call(this);
        }, 1000);
    };

    nextPage() {
        this.CompanyService.readMarketplaces(this.props.profile_id, this.state.pageable.page,
            (result) => {
                this.setState({
                    items: this.state.items.concat(result.content),
                    hasMore: true,
                    message: result.totalElements > 0 ? "Carregando..." : "Não existem marketplaces vinculados!",
                    pageable: {
                        page:  this.state.pageable.page+1,
                        totalPages: result.totalPages,
                        totalElements: result.totalElements
                    }
                });
            },
            (error) => {
                console.log("Erro:");
                console.log(error);
            }
        );
    }

    updateList () {
        this.setState({
            items: Array.from({length: 0}),
            pageable: {
                page:  0,
                totalPages: 0,
                totalElements: 0
            }
        });
        this.fetchMoreData.call(this);
    }

    render() {
        if(this.props.update && this.state.items.length > 0) {
            
        }

        if(this.state.items.length > 0) {
            return <div>
                        <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={<Alert color="info">{this.state.message}</Alert>}
                            endMessage={
                                <Alert color="success">
                                    {this.state.pageable.totalElements}
                                    {this.state.pageable.totalElements > 1 ? " resultados carregados." : " resultado carregado."} 
                                </Alert>
                            }
                        >
                            {this.state.items.map((i, index) => {
                                return (
                                    <ImageCard
                                        key={i.id}
                                        avatar={Logo}
                                        content={
                                            <h3>{i.name}</h3>
                                        }   
                                        options={
                                            <Button color="danger" onClick={this.props.toggle}>
                                                CONECTAR
                                            </Button>
                                        }
                                        width={this.props.width}
                                    />
                                );
                            })}
                        </InfiniteScroll>    
                    </div>
        } else {
            return <Alert color="info">{this.state.message}</Alert>
        }
    }
}