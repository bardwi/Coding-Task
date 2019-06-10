import React, {Component} from 'react';
import {Nav, Link, Navbar, Badge, Collapse, Form, FormControl, Button} from 'react-bootstrap';
import {connect} from 'react-redux';


class Search extends Component {
   constructor() {
      super();
      this.state = {
        search: ''
    };

   }
   updateSearch(event){
       this.setState({search: event.target.value.substr(0,20)});
   }


    render(){

        let filteredBooks
        return(
            <div className="search">
               <div className='input-group'>
                 
                  

                   <input type="text"
                      defaultValue= {this.state.search} onChange={this.updateSearch.bind(this)} />
               </div>
                
            </div>
        )
    }
    
}


export default Search