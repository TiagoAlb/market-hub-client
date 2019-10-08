import 'material-design-icons-iconfont';
import React, { Component } from 'react';
import { Container, ModalFooter } from 'reactstrap';
import Button from '../../components/CustomButton/CustomButton.jsx';
import AdForm from './AdForm';
import AdService from '../../services/AdServices/AdService.jsx';

class AdCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            category_id: '',
            ad: {
                id: 0,
                title: '',
                price: 0,
                type: '',
                quantity: 1,
                description: '',
                category: {
                    id: 0,
                    items: [
                        {
                            id: 0,
                            name: '',
                            ml_id: ''
                        }
                    ]
                },
                product: {
                    id: 0,
                    name: '',
                    images: [],
                    dataSheet: {
                        id: 0,
                        items: []
                    },
                    condition: {
                        id: 1
                    },
                },
                marketplaces: []
            },
            file: new FormData(),
            image_upload_list: [],
            marketplaces_available_list: [],
            category_nav_list: {},
            category_list: {}
        }
        this.incrementDecrementStep = this.incrementDecrementStep.bind(this);
        this.setAdValues = this.setAdValues.bind(this);
        this.changeCategoryNavList = this.changeCategoryNavList.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this.categorySearch = this.categorySearch.bind(this);
        this.AdService = new AdService();
    }

    categoryNavSearch(title, categoryId) {
        let search = {
            title: title,
            category: categoryId,
            price: '',
            seller_id: ''
        }
        this.AdService.categoryNavSearch(search,
            (success) => {
                this.setState({
                    category_nav_list: success
                });
                this.setProductValues('ml_id', success[success.length - 1]);
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
        this.AdService.categorySearch(search,
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

    create() {
        this.AdService.create(this.state.ad,
            (success) => {
                this.setState({
                    ad: success
                });
            }, (error) => {
                console.log('Erro!');
                console.log(error);
            }
        )
    }

    update() {
        this.AdService.update(this.state.ad, this.state.step,
            (success) => {
                console.log(success);
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
        data.append('file', fileData);
        data.append('name', 'profile_avatar');
        data.append('description', 'Image profile');

        let images = this.state.file;
        // images.push({ data });

        this.setState((state) => state.file = data);

        //     if (this.validateImage(fileData)) {
        reader.onloadend = () => {
            let images_upload = this.state.image_upload_list;
            images_upload.push({ 'img': reader.result });

            this.setState({ image_upload_list: images_upload });
        };
        reader.readAsDataURL(fileData)
        // }
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
        this.setProductValues('ml_id', this.state.category_nav_list[this.state.category_nav_list.length - 1]);
    }

    setAdValues(attribute, value) {
        this.setState(
            (state) => state.ad[attribute] = value
        );
        if (attribute === 'title')
            this.categoryNavSearch(value, '');
    }

    setProductValues(attribute, value) {
        this.setState(
            (state) => state.ad['category'] = {
                id: 0,
                items: [
                    {
                        id: 0,
                        name: value.name,
                        ml_id: value.id
                    }
                ]
            }
        );
    }

    insertImages() {
        /*   this.AdService.insertImages(this.state.ad.id, this.state.file,
               (success) => {
                   console.log("Imagens cadastradas!");
               }, (error) => {
                   console.log(error);
               }
           )*/

        this.AdService.uploadFileProgress(this.state.ad.id, this.state.file);
    }

    incrementDecrementStep(condition) {
        if (this.state.step > 1) {
            if (this.state.ad.id > 0) {
                this.update();
            } else {
                this.create();
            }
        }
        if (this.state.step > 4) {
            this.insertImages();
        }
        if (condition === 'increment') {
            this.setState({
                step: this.state.step + 1
            });
        } else if (condition === 'decrement') {
            this.setState({
                step: this.state.step - 1
            });
        }

    }

    handleStepCategory = (categoryId) => {
        this.incrementDecrementStep('increment');
        this.setAdValues('type', categoryId);
        this.setState({ category_id: categoryId });
    }

    render() {
        return (
            <Container fluid>
                <br />
                <AdForm
                    step={this.state.step}
                    handleStepCategory={this.handleStepCategory}
                    setAdValues={this.setAdValues}
                    ad={this.state.ad}
                    categorySearch={this.categorySearch}
                    category_nav_list={this.state.category_nav_list}
                    category_list={this.state.category_list}
                    changeCategoryNavList={this.changeCategoryNavList}
                    _handleImageChange={this._handleImageChange}
                    image_upload_list={this.state.image_upload_list}
                    profile_id={this.props.profile_id}
                />
                {this.state.step > 1 ?
                    <ModalFooter>
                        <div style={{ width: '100%' }}>
                            <Button onClick={() => { this.incrementDecrementStep('decrement') }}>
                                Voltar
                            </Button>
                            <Button onClick={() => { this.incrementDecrementStep('increment') }}
                                fill pullRight
                                color='primary'>
                                {this.state.step < 5 ? 'Próximo' : 'Publicar'}
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

export default AdCreate;