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
                description: '',
                image_list: [],
            },
            image_upload_list: [],
            category_nav_list: {},
            category_list: {}
        }
        this.incrementStep = this.incrementStep.bind(this);
        this.decrementStep = this.decrementStep.bind(this);
        this.setAdsValues = this.setAdsValues.bind(this);
        this.changeCategoryNavList = this.changeCategoryNavList.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
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
                this.setAdsValues('category_id', success[success.length - 1]);
                if (success.length > 0)
                    this.categorySearch(success[success.length - 1].id, '');
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

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let fileData = e.target.files[0];
        let data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('name', 'profile_avatar');
        data.append('description', 'Image profile');

        let images = this.state.ads.image_list;
        images.push({ data });

        this.setState((state) => state.ads.image_list = images);

        if (this.validateImage(fileData)) {
            reader.onloadend = () => {
                let images_upload = this.state.image_upload_list;
                images_upload.push({ 'img': reader.result });

                this.setState({ image_upload_list: images_upload });
            };
            reader.readAsDataURL(fileData)
        }
    }

    validateImage(file) {
        if (file) {
            let num = file.name.split(".").length;
            let name = file.name.split(".")[num - 1].toLowerCase();
            if (file.size <= 1048576) {
                if (name === "png" || name === "tiff" || name === "jpg" || name === "jpeg" || name === "bmp") {
                    this.setState({ error: "" });
                    return true;
                } else {
                    this.setState({ error: "Formato inválido! São aceitos apenas arquivos no formato de imagem." });
                    return false;
                }
            } else {
                this.setState({ error: "A imagem não pode ser maior que 1mb." });
                return false;
            }
        } else {
            this.setState({ error: "" });
            return false;
        }
    }

    changeCategoryNavList(condition, categoryIndex, object) {
        switch (condition) {
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
                    category_nav_list: this.state.category_nav_list.splice(0, categoryIndex + 1)
                });
                break;
            default:
                break;
        }
        this.setAdsValues('category_id', this.state.category_nav_list[this.state.category_nav_list.length - 1]);
    }

    setAdsValues(attribute, value) {
        this.setState(
            (state) => state.ads[attribute] = value
        );
        if (attribute === 'title')
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
                <br />
                <AdsForm
                    step={this.state.step}
                    onSelectCategory={this.handleStepCategory}
                    setAdsValues={this.setAdsValues}
                    ads={this.state.ads}
                    categorySearch={this.categorySearch}
                    category_nav_list={this.state.category_nav_list}
                    category_list={this.state.category_list}
                    changeCategoryNavList={this.changeCategoryNavList}
                    _handleImageChange={this._handleImageChange}
                    image_upload_list={this.state.image_upload_list}
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