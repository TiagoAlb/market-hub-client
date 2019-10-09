import 'material-design-icons-iconfont';
import React, { Component } from 'react';
import {
    Card, CardBody, CardFooter, CardText, Col, InputGroupText, Container,
    Form, FormGroup, FormText, Input, Label, Row, InputGroup, InputGroupAddon,
    Spinner
} from 'reactstrap';
import ListItem from '../../components/ListItem/ListItem.jsx';
import AddImage from '../../components/AddImage/AddImage.jsx';
import ImageSelection from '../../components/ImageSelection/ImageSelection.jsx';
import AdAvailableMarketplacesList from './AdAvailableMarketplacesList.jsx';

const ad_type = [
    {
        id: 'MKHPROTY',
        name: 'Produtos',
        icon: 'camera_alt',
        color: ''
    },
    {
        id: 'MKHVEHTY',
        name: 'Veículos',
        icon: 'directions_car',
        color: ''
    },
    {
        id: 'MKHRESTY',
        name: 'Imóveis',
        icon: 'apartment',
        color: ''
    },
    {
        id: 'MKHSERVTY',
        name: 'Serviços',
        icon: 'room_service',
        color: ''
    }
];

const search_options_style = {
    padding: '10 0 10 0'
}

class AdForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ad: this.props.ad
        }
    }
    render() {
        switch (this.props.step) {
            case 1:
                return <Step1 handleStepCategory={this.props.handleStepCategory} />
            case 2:
                return (
                    <Step2 setAdValues={this.props.setAdValues}
                        ad={this.state.ad}
                        category_nav_list={this.props.category_nav_list}
                        category_list={this.props.category_list}
                        categorySearch={this.props.categorySearch}
                        changeCategoryNavList={this.props.changeCategoryNavList}
                    />
                );
            case 3:
                return <Step3 setAdValues={this.props.setAdValues} />
            case 4:
                return (
                    <Step4
                        _handleImageChange={this.props._handleImageChange}
                        image_upload_list={this.props.image_upload_list}
                        setAdValues={this.props.setAdValues}
                    />
                );
            case 5:
                return (
                    <Step5 setAdValues={this.props.setAdValues}
                        marketplaces_available_list={this.props.marketplaces_available_list} profile_id={this.props.profile_id} />
                );
            default:
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
                            </Col>
                        </Row>
                    </Container>
                );
        }
    }
}

class Step1 extends Component {
    handleStepCategory = (categoryId) => {
        this.props.handleStepCategory(categoryId);
    }

    render() {
        return (
            <div>
                <h4 style={{ marginTop: '0' }}>O que você deseja publicar?</h4>
                <Row>
                    {ad_type.map((prop, key) => {
                        return (
                            <Col
                                md={6}
                                sm={4}
                                key={key}
                            >
                                <div className='ad_type' onClick={() => this.handleStepCategory(prop.id)}>
                                    <Card style={{ textAlign: 'center', cursor: 'hand' }}>
                                        <CardBody style={{ padding: '0' }}>
                                            <CardText>
                                                <i className='material-icons' style={{ padding: '20 0 0 0', fontSize: '48' }} color={prop.name}>{prop.icon}</i>
                                            </CardText>
                                            <CardFooter>{prop.name}</CardFooter>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

class Step2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categorySearchInput: ''
        }
    }

    changeCategoryNavList = (condition, categoryIndex, object) => {
        this.props.changeCategoryNavList(condition, categoryIndex, object);
    }

    changeInputCategorySearch(categoryName) {
        if (this.props.category_nav_list.length > 0)
            this.categorySearch(this.props.category_nav_list[this.props.category_nav_list.length - 1].id, categoryName);
        else
            this.categorySearch('', categoryName);
        this.setState({
            categorySearchInput: categoryName
        });
    }

    setAdValues = (attribute, value) => {
        this.props.setAdValues(attribute, value);
    }

    categorySearch = (category, name) => {
        this.props.categorySearch(category, name);
    }

    category_options_selected() {
        if (this.props.category_nav_list.length > 0) {
            return (
                <div style={{ fontSize: '14px' }}>
                    <span style={{ color: '#0099CC', cursor: 'hand' }}
                        onClick={() => {
                            this.categorySearch('', this.state.categorySearchInput);
                            this.changeCategoryNavList('delete', -1, '');
                        }}>Inicio</span>
                    <span>{' > '}</span>
                    {this.props.category_nav_list.map((prop, index) => {
                        return (
                            <span key={prop.id}>
                                <span style={{ color: '#0099CC', cursor: 'hand' }}
                                    onClick={() => {
                                        this.categorySearch(prop.id, this.state.categorySearchInput);
                                        this.changeCategoryNavList('delete', index, '');
                                    }}
                                >{prop.name}</span>
                                {(index !== this.props.category_nav_list.length - 1) ?
                                    <span>
                                        {' > '}
                                    </span>
                                    :
                                    ''
                                }
                            </span>
                        );
                    })}
                </div>
            );
        } else {
            return ''
        }
    }

    category_options() {
        if (this.props.category_list.length > 0) {
            return (
                <Container fluid style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {this.props.category_list.map((prop) => {
                        return <div key={prop.id} onClick={() => {
                            let objCategory = {
                                id: prop.id,
                                name: prop.name
                            }
                            this.changeCategoryNavList('add', 0, objCategory);
                        }}>
                            <ListItem item_name={prop.name} />
                        </div>
                    })}
                </Container>
            );
        } else {
            return ''
        }
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for='title'>Digite o título de seu anúncio</Label>
                    <FormText color='muted'>
                        Para melhor identificação, inicie com o nome, marca e modelo de seu produto.
                    </FormText>
                    <Input type='text' name='title' id='title' value={this.props.ad.title}
                        placeholder='Ex: Câmera Fotográfica Nikon D3200'
                        onChange={(e) => {
                            e.preventDefault();
                            this.setAdValues('title', e.target.value);
                        }}
                    />
                </FormGroup>
                {this.props.ad.title !== null && this.props.ad.title !== '' ?
                    <FormGroup>
                        <Label for='category_id'>Selecione a categoria de seu produto</Label>
                        <FormText color='muted'>
                            Verifique as categorias de seu produto. Caso necessite alterar, clique nas categorias sugeridas e escolha entre as opções que mais definem o seu anúncio.
                        </FormText>
                        {this.category_options_selected()}
                        {this.props.category_list.length > 0 ?
                            <InputGroup style={search_options_style}>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <i className='material-icons'>search</i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='text' placeholder='Pesquisar Categoria'
                                    name='inputSearchCategory' id='inputSearchCategory'
                                    value={this.state.categorySearchInput}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        this.changeInputCategorySearch(e.target.value);
                                    }}
                                />
                            </InputGroup>
                            :
                            ""
                        }
                        {this.category_options()}
                    </FormGroup>
                    :
                    ''
                }
            </Form>
        );
    }
}

class Step3 extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <Form>
                        <FormGroup>
                            <Label for='attributes'>Informe as características do seu protuto</Label>
                            <FormText color='muted'>
                                As especificações do produto ajudam os compradores a entender o
                                que você quer vender, diminuindo a necessidade de questionamentos
                                e aumentano a qualidade de seu anúncio.
                            </FormText>
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Marca</Label>
                                    <Input type='text' name='brand' id='brand'
                                        placeholder='Marca'
                                        onChange={(e) => {

                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Modelo</Label>
                                    <Input type='text' name='model' id='model'
                                        placeholder='Modelo'
                                        onChange={(e) => {

                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Tipo</Label>
                                    <Input type='text' name='type' id='type'
                                        placeholder='Tipo'
                                        onChange={(e) => {

                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}></Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        );
    }
}

class Step4 extends Component {
    imageUploadList() {
        return (
            <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
                <tr>
                    <td><AddImage _handleImageChange={this.props._handleImageChange} /></td>
                    {this.props.image_upload_list.length > 0 ?
                        this.props.image_upload_list.map((prop, key) => {
                            return <td><ImageSelection key={key} src={prop.img} alt={"Image " + key} uploadingProgress={prop.uploadingProgress}/></td>
                        })
                        : <td></td>}
                </tr>
            </div>
        );
    }
    setAdValues = (attribute, value) => {
        this.props.setAdValues(attribute, value);
    }
    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for='attributes'>Adicione imagens ao seu anúncio</Label>
                    <FormText color='muted'>
                        Selecione imagens nítidas e com boa iluminação para representar o seu anúncio.
                        A quantidade de uploads pode variar de acordo com o marketplace.
                    </FormText>
                    <br />
                    {this.imageUploadList()}
                </FormGroup>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <Label>Quantidade</Label>
                            <Input type='text' name='quantity' id='quantity'
                                placeholder='1'
                                onChange={(e) => {
                                    this.setAdValues('quantity', e.target.value);
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <Label>Preço</Label>
                            <Input type='text' name='price' id='price'
                                placeholder='R$'
                                onChange={(e) => {
                                    this.setAdValues('price', e.target.value);
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label>Condição</Label>
                    <Input type="select" name="condition" id="condition"
                        onChange={(e) => {

                        }}>
                        <option value={1}>Novo</option>
                        <option value={2}>Usado</option>
                        <option value={3}>Recondicionado</option>
                    </Input>
                </FormGroup>
            </Form>
        );
    }
}

class Step5 extends Component {
    marketplacesAvailableList() {
        return (
            <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
                <tr>
                    {this.props.marketplaces_available_list.length > 0 ?
                        this.props.marketplaces_available_list.map((prop, key) => {
                            return <td><ImageSelection key={key} src={prop.img} alt={"Image " + key} /></td>
                        })
                        : ''}
                </tr>
            </div>
        );
    }

    setAdValues = (attribute, value) => {
        this.props.setAdValues(attribute, value);
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for='attributes'>Descreva seu produto</Label>
                    <FormText color='muted'>
                        Selecione imagens nítidas e com boa iluminação para representar o seu anúncio.
                        A quantidade de uploads pode variar de acordo com o marketplace.
                    </FormText>
                    <Input type="textarea" name="description" id="description"
                        onChange={(e) => {
                            this.setAdValues('description', e.target.value);
                        }} />
                </FormGroup>
                <FormGroup>
                    <Label>Selecione os Marketplaces a vincular</Label>
                    <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
                        <AdAvailableMarketplacesList profile_id={this.props.profile_id} />
                    </div>
                </FormGroup>
            </Form>
        );
    }
}

export default AdForm;