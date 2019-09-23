import React, { Component } from 'react';
import 'material-design-icons-iconfont';
import {
    Col, Row
} from 'reactstrap';

export class ListItem extends Component {
  render() {
    return (
        <Row id='row_list_item'>
            <Col>
                {this.props.item_name}
            </Col>
            <Col xs={'auto'}>
                <i className='material-icons'>arrow_forward_ios</i>
            </Col>
        </Row>
    );
  }
}

export default ListItem;