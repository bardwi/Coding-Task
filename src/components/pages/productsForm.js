"use strict"

import React from 'react';
import {Card, DropdownButton,DropdownItem,FormControl,Image, Col, Row,InputGroup,FormGroup, FormLabel, Button, Container} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import axios from 'axios';
import {postBooks, deleteBooks, getBooks, resetButton} from '../../actions/booksActions';
import '../../css/cart.css';





class ProductsForm extends React.Component {
    constructor(){
        super();
        this.state = {
            images: [{}],
            img:''
        }
    }
    
    componentDidMount(){
        this.props.getBooks();
        axios.get('/api/images')
        .then(function(response){
           this.setState({images:response.data});
        }.bind(this))
         .catch(function(err){
            this.setState({images:'error loading image files from the server', img:''})
        }.bind(this))
    }

    handleSubmit() {
        const notebook = [{
         title: findDOMNode(this.refs.title).value,
         description: findDOMNode(this.refs.description).value,
         images: findDOMNode(this.refs.image).value,
         price: findDOMNode(this.refs.price).value,
        }]
        this.props.postBooks(notebook);
    }
      onDelete(){
          let bookId = findDOMNode(this.refs.delete).value;
          this.props.deleteBooks(bookId);
      }
      handleSelect(img) {
          this.setState({
              img: '/images/'+ img
          })
      }

      resetForm(){

         this.props.resetButton();
         findDOMNode(this.refs.title).value = '';
         findDOMNode(this.refs.description).value = '';
         findDOMNode(this.refs.price).value= '';
         this.setState({img:''})
      }
      

        render() {

            const productsList = this.props.notebooks.map(function(booksArr) {
                return(
                    <option key={booksArr._id}> {booksArr._id}</option>
                )
            })

            const imgList = this.state.images.map(function(imgArr, i){
                return(
                    <DropdownItem key={i} eventKey={imgArr.name}
                    onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}
                    </DropdownItem>
                )
            },this)

        
        return(
            
            <Container>
                <Row>
                    <Col xs={4} sm={4} md={4}>
                      <Card> 
                            <InputGroup>
                                <FormControl type="text" ref="image" defaultValue={this.state.img} />
                                    <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant="outline-secondary"
                                    title="Select an image"  
                                    id="input-dropdown-1">
                                    {imgList}
                                </DropdownButton>
                             </InputGroup>
                            <Image src={this.state.img} responsive="true"/>
                       </Card>
                    
                       <Card>
                            <FormGroup controlId="title" validationstate={this.props.validation}>
                                <FormLabel>Title</FormLabel>
                                    <FormControl
                                    type="text"
                                    placeholder="Enter Title"
                                    ref="title"/>
                                    <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="description" validationstate={this.props.validation}>
                                <FormLabel>Description</FormLabel>
                                    <FormControl
                                    type="text"
                                    placeholder="Enter Description"
                                    ref="description"
                                    />
                                    <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="price" validationstate={this.props.validation}>
                                <FormLabel>Price</FormLabel>
                                    <FormControl
                                    type="text"
                                    placeholder="Price"
                                    ref="price"
                                    />
                                    <FormControl.Feedback/>
                            </FormGroup>
                           <Button 
                             onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} 
                             bsstyle ={(!this.props.style)?("info"):(this.props.style)}>
                             {(!this.props.msg)?("Save book"):(this.props.msg)}</Button>
                        </Card>
                        <Card>
                            <FormGroup controlId="formControlsSelect">
                                
                                <FormLabel>Select a book id to delete</FormLabel>
                                <FormControl ref="delete" as="select" placeholder="select">
                                <option value="select">select</option>
                                {productsList}
                                </FormControl>
                            </FormGroup>
                        <Button onClick={this.onDelete.bind(this)} bsstyle="danger">Delete Book </Button>
                    
                        </Card>
                    </Col>
                </Row>
            </Container>

        )
    }
} 
function mapStateToProps(state){
    return {
        notebooks: state.notebooks.notebooks,
        msg: state.notebooks.mg,
        style: state.notebooks.style,
        validation: state.notebooks.validation
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        postBooks,
        deleteBooks,
        getBooks,
        resetButton,
      }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductsForm);