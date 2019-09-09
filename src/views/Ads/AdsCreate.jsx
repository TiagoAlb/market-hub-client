import 'material-design-icons-iconfont';
import React, { Component } from 'react';
import { Container, ModalFooter } from 'reactstrap';
import Button from '../../components/CustomButton/CustomButton.jsx';
import AdsForm from './AdsForm';
import AdsService from '../../services/AdsServices/AdsService.jsx';

class AdsCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            category_id: '',
            ads: {
                title: '',
                category_id: '',
                price: 0,
                condition: 'new',
                available_quantity: 1,
                video_id: '',
                description: ''
            },
            category_nav_list: {},
            category_list: {}
        }
        this.incrementStep = this.incrementStep.bind(this);
        this.decrementStep = this.decrementStep.bind(this);
        this.setAdsValues = this.setAdsValues.bind(this);
        this.changeCategoryNavList = this.changeCategoryNavList.bind(this);
        this.categorySearch = this.categorySearch.bind(this);
        this.AdsService = new AdsService();
    }

    categoryNavSearch(title, categoryId) {
        let search = {
            title: title,
            category: categoryId,
            price: '',
            seller_id: ''
        }
        this.AdsService.categoryNavSearch(search,
            (success) => {
                this.setState({
                    category_nav_list: success
                });
                if(success.length > 0)
                    this.categorySearch(success[success.length-1].id, '');
                else
                    this.categorySearch('', '');
            }, (error) => {
                console.log('Erro!');
                console.log(error);
            }
        )
    }

    categorySearch(categoryId, name) {
        let search = {
            name: name,
            category: categoryId,
            price: '',
            seller_id: ''
        }
        this.AdsService.categorySearch(search,
            (success) => {
                this.setState({
                    category_list: success
                });
            }, (error) => {
                console.log('Erro!');
                console.log(error);
            }
        )
    }

    changeCategoryNavList(condition, categoryIndex, object) {
        switch(condition) {
            case 'add':
                let obj = this.state.category_nav_list;
                obj.push(object);
                this.setState({
                    category_nav_list: obj
                });
                this.categorySearch(object.id, '');
                break;
            case 'delete':
                this.setState({
                    category_nav_list: this.state.category_nav_list.splice(0, categoryIndex+1)
                });
                break;
            default:
                break;
        }
        
    }

    setAdsValues(attribute, value) {
        this.setState(
            (state) => state.ads[attribute] = value
        );
        if(attribute==='title')
            this.categoryNavSearch(value, '');
    }

    incrementStep() {
        this.setState({
            step: this.state.step + 1
        });
    }

    decrementStep() {
        this.setState({
            step: this.state.step - 1
        });
    }

    handleStepCategory = (categoryId) => {
        this.setState({ category_id: categoryId, step: this.state.step + 1 });
    }

    render() {
        return (
            <Container fluid>
                <br/>
                <AdsForm
                    step={this.state.step}
                    onSelectCategory={this.handleStepCategory}
                    setAdsValues={this.setAdsValues}
                    ads={this.state.ads}
                    categorySearch={this.categorySearch}
                    category_nav_list={this.state.category_nav_list}
                    category_list={this.state.category_list}
                    changeCategoryNavList={this.changeCategoryNavList}
                />
                {this.state.step > 0 ?
                    <ModalFooter>
                        <div style={{ width: '100%' }}>
                            <Button onClick={this.decrementStep}>
                                Voltar
                            </Button>
                            <Button onClick={this.incrementStep}
                                fill pullRight
                                color='primary'>
                                Próximo
                            </Button>
                        </div>
                    </ModalFooter>
                :
                    ''
                }
            </Container>
        );
    }
}

export default AdsCreate;