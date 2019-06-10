import React from 'react';
import {Image, Row, Col, Card, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart,updateCart} from '../../actions/cartActions';

class ProductItem extends React.Component {
handleCart(){
    const notebook = [...this.props.cart, {
        _id: this.props._id,
        title: this.props.title,
        description: this.props.description,
        images: this.props.images,
        price: this.props.price,
        quantity: 1
      }]

      if (this.props.cart.length > 0) {
        let _id = this.props._id;
  
        let cartIndex = this.props.cart.findIndex(function(cart) {
          return cart._id === _id;
        })
  
        if (cartIndex === -1) {
          this.props.addToCart(notebook);
        } else {
          this.props.updateCart(_id, 1, this.props.cart);
        }
      } else {
        this.props.addToCart(notebook);
      }
  
    }

    constructor() {
        super();
        this.state = {
          isClicked:false
        };
      }
    
      onReadMore() {
        this.setState({
          isClicked: true
        })
      }
    
  


    render() {
        return(
            <Card className="product_card">
                <Row>
                    <Col xs={4} sm={4} md={4}>
                      <Image src={this.props.images} responsive="true" width="300px"/>
                    </Col>
                    <Col  xs={12} md={12}>
                        <h6 style={{fontWeight:"bold"}}>{this.props.title}</h6>
                        <p>{(this.props.description.length > 80 && this.state.isClicked === 
                        false)?(this.props.description.substring(0,80)):(this.props.description)}
                         <Button className='link' onClick={this.onReadMore.bind(this)}>
                             {(this.state.isClicked === false && this.props.description !== null &&
                                this.props.description.length > 80)?('...read more'):('')}
                         </Button>    
                        </p>
                        <h6>eur. {this.props.price}</h6>
                        <Button onClick={this.handleCart.bind(this)} bsstyle='primary'>Buy now</Button>
                    </Col>
                </Row>
            </Card>
        )
    }
}
function mapStateToProps(state){
    return {
        cart: state.cart.cart
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);