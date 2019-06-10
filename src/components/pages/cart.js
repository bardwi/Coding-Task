"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {Modal, Col, Row,Form, Card, Container, Button, ButtonGroup, FormLabel}  from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions';



class Cart extends React.Component{
    componentDidMount(){
        this.props.getCart();
    }
    
    onDelete(_id){
        const currentBookToDelete = this.props.cart;
        // Determine at which index in books array is the book to be deleted
        const indexToDelete = currentBookToDelete.findIndex(
            function(cart) {
                return cart._id === _id;
            }
        )
        //use slice to remove the book at the specific index
   let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),...currentBookToDelete.slice(indexToDelete + 1)]
    this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id){
        this.props.updateCart(_id, 1, this.props.cart);

    }
    onDecrement(_id, quantity){
        if(quantity >1){
            this.props.updateCart(_id, -1, this.props.cart);
        }
     }

     constructor(){
         super();
         this.state = {
             showModal:false
         }
     }
 
     open() {
         this.setState({showModal: true})
     }

     close() {
         this.setState({showModal:false})
     }

     render() {
        if (this.props.cart[0]) {
          return this.renderCart();
        } else {
          return this.renderEmpty();
        }
      }
    
      renderEmpty() {
        return(<div></div>)
      }
   renderCart() {
       const cartItemList = this.props.cart.map(function(cartArr){
           return(
               <Card key={cartArr._id}>
                   <Row>
                       <Col xs={12} sm={1} md={3}>
                       <h6>{cartArr.title}</h6><span>    </span>
                       </Col>
                       <Col xs={12} sm={2} md={2}>
                       <h6>eur. {cartArr.price}</h6>
                       </Col>
                       <Col xs={12} sm= {2} md={3}>
                       <h6>qty. <FormLabel bsstyle="success">{cartArr.quantity}</FormLabel></h6>
                       </Col>
                       <Col xs={12} sm= {2} md={4}>
                       <ButtonGroup style={{minWidth: '300px'}}>
                           <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} variant="outline-info" size="small">-</Button>
                           <Button onClick={this.onIncrement.bind(this, cartArr._id)} variant="outline-info" size="small">+</Button>
                           <span>     </span>
                           
                           <Button onClick={this.onDelete.bind(this, cartArr._id)} variant="danger" size="small">DELETE</Button>

                       </ButtonGroup>
                       </Col>
                       
                       
                   </Row>
               </Card>
           )
       }, this)
       return(
           <Card>
           <Card.Header>Cart</Card.Header>
               {cartItemList}
            <Row>
                <Col md={12}>
                    <h6 style={{fontWeight:"bold"}}>Total amount: {this.props.totalAmount}</h6>
                    <Button onClick={this.open.bind(this)} bsstyle="success" size="small">
                        PROCEED TO CHECKOUT
                    </Button>
                </Col>

            </Row>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter name" />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>
                </Form>
                    {/*<p>You will receive an email confirmation</p>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Col md={8} >
                        <h6 style={{fontWeight:"bold"}}>Total €: {this.props.totalAmount}</h6>
                    </Col>
                    <Button onClick={this.close.bind(this)}>Complete Order</Button>
                </Modal.Footer>
            </Modal>
           </Card>
       )
   }

}
function mapStateToProps(state) {
    return {
      cart: state.cart.cart,
      totalAmount: state.cart.totalAmount
    }
  }

function mapDispatchToProps(dispatch){
    return bindActionCreators({
      deleteCartItem: deleteCartItem,
      updateCart: updateCart,
      getCart: getCart
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);