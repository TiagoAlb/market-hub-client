import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Alert } from 'reactstrap';
import CompanyService from '../../services/CompanyServices/CompanyService.jsx';
import MarketplaceIcon from '../../components/MarketplaceIcon/MarketplaceIcon.jsx';
import loginService from '../../services/LoginService.jsx';

export default class AdAvailableMarketplacesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: Array.from({ length: 0 }),
            message: 'Carregando...',
            pageable: {
                page: 0,
                totalPages: 0,
                totalElements: 0
            },
            selected: [],
            hasMore: true
        };
        this.fetchMoreData.call(this);
        this.CompanyService = new CompanyService();
        this.alterSelectedList = this.alterSelectedList.bind(this);
    }

    fetchMoreData = () => {
        if (this.state.pageable.page !== 0 && this.state.pageable.page >= this.state.pageable.totalPages) {
            this.setState({ hasMore: false });
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
                        page: this.state.pageable.page + 1,
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

    updateList() {
        this.setState({
            items: Array.from({ length: 0 }),
            pageable: {
                page: 0,
                totalPages: 0,
                totalElements: 0
            }
        });
        this.fetchMoreData.call(this);
    }

    alterSelectedList(id) {
        let selectedList = this.state.selected;
        let index = selectedList.indexOf(id);
        if (index !== -1) {
            selectedList.splice(index, 1)
        } else {
            selectedList.push(id);
        }
        this.setState({
            selected: selectedList
        });
    }

    render() {
        if (this.state.items.length > 0) {
            return <div>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    endMessage={
                        <Alert color="success">
                            {this.state.pageable.totalElements}
                            {this.state.pageable.totalElements > 1 ? " resultados carregados." : " resultado carregado."}
                        </Alert>
                    }
                >
                    <tr style={{ float: 'right' }}>
                        {this.state.items.map((i, key) => {
                            return (
                                <td style={{ paddingLeft: '2px' }} key={key}>
                                    <MarketplaceIcon id={i.id} idItem={"ad_icon_" + i.id} key={i.id}
                                        marketplaceName={i.name} avatar={`/api/marketplaces/` + i.id + `/image?` + loginService.getAuthorizationGet()}
                                        tam='50px'
                                        onClickCall={this.alterSelectedList}
                                        status={this.state.selected.indexOf(i.id) !== -1 ? 'selected' : ''} />
                                </td>
                            );
                        })}
                    </tr>
                </InfiniteScroll>
            </div>
        } else {
            return <Alert color="info">{this.state.message}</Alert>
        }
    }
}