"use strict"

import React from 'react';
import {Nav, Link, Navbar, Badge, Collapse, Form, FormControl, Button} from 'react-bootstrap';
import Search from './search/search';

class Menu extends React.Component {
    render() {
        return(
                        
            <Navbar inverse="true" fixed="top" bg="dark">
           
            <Navbar.Brand ><a href="/"><img src="/images/logo-main.png" width="30px"></img></a>
            </Navbar.Brand>
            
            <Navbar.Toggle />
           
            <Navbar.Collapse>
                <Nav className="mr-auto" style={{textTransform:"uppercase", paddingLeft:"10px", fontSize:"13px", letterSpacing:"0.06em"}}>
                    
                    <Nav.Link href="/products" style={{ paddingRight:"20px", color:"#000000"}}> PRODUCTS</Nav.Link>
                </Nav>
                <Search/>
                <Nav className="justify-content-end" style={{textTransform:"uppercase",  paddingLeft:"10px", fontSize:"13px", letterSpacing:"0.06em"}}>
                  <Nav.Link href="/admin" style={{ paddingRight:"20px", color:"#000000"}}> Admin</Nav.Link>
                  <Nav.Link href="/cart" style={{ paddingRight:"20px", color:"#000000"}}> Cart
                  {(this.props.cartItemsNumber > 0)?
                  (<Badge variant="secondary">{this.props.cartItemsNumber}</Badge>):('')}
                  </Nav.Link>
                
                
                </Nav>
               
               
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Menu







