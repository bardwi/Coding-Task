"use strict"
import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {getBooks} from '../../actions/booksActions';
import {bindActionCreators} from 'redux';
import {Card, Col, Row, Button, Container,Carousel} from 'react-bootstrap';
import ProductItem from './productItem';
import ProductsForm from './productsForm';
import Cart from './cart';



class ProductsList extends React.Component {
  componentDidMount() {
    this.props.getBooks()
  }
   render() {
    
     const ProductsList = this.props.notebooks.map(function(booksArr){
       return(
       
       <Col xs={12} sm={6} md={3} key={booksArr._id}>
         
         <ProductItem
             _id= {booksArr._id}
             title={booksArr.title}
             description={booksArr.description}
             images={booksArr.images}
             price={booksArr.price}/>
       </Col>
        
     
       )
     })
     return (
      <Container>
        <Row>
            <Carousel>
                <Carousel.Item>
                  <img width={1000} height={500}
                    className="d-block w-100"
                    src="/images/slider5.jpg"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>Handmade Handcrafted Notebooks</h3>
                    <p></p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img width={1000} height={500}
                    className="d-block w-100"
                    src="/images/slider6.jpg"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Bonoowa Handcrafted 360° Foldable Notebook</h3>
                    <p></p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img width={1000} height={500}
                    className="d-block w-100"
                    src="/images/slider4.jpg"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Hardcover Jaapi Notebook</h3>
                    <p></p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
        </Row>

        
        <Row>
          <Cart/>
        </Row>
        
        
        <Row style={{marginTop:"15px", marginBottom: "15px"}}>
         
           {ProductsList}

        </Row>
   

      </Container>
     )
       
    }
  }


  function mapStateToProps(state) {
    return {
      notebooks: state.notebooks.notebooks
    }
  }
  function mapDispatchToProps(dispatch) {
    return  bindActionCreators({
      getBooks: getBooks
    }, dispatch)
    
  }


  export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);