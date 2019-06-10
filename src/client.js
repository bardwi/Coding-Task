import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter,Route} from 'react-router-dom';


import {Router,IndexRoute, browserHistory,Link ,Switch} from 'react-router';
//import { BrowserRouter, Route, Link } from "react-router-dom";

import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';


// import combined reducers
import reducers from './reducers/index';

// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';

import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';



const middleware = applyMiddleware(thunk,createLogger());
const store = createStore(reducers, middleware);


import ProductsList from './components/pages/ProductsList';
import ProductsForm from './components/pages/productsForm';
import Main from './main';

const Routes =(
  
     <Provider store={store}>
        <BrowserRouter>
         <Route path="/" component={Main}/>
            <Route component={ProductsList}/>
            <Route path="/admin" component={ProductsForm}/>
        </BrowserRouter>
    </Provider>
 
)
render(
 Routes,document.getElementById('app')
 );

//import Menu from './components/menu';
//import Footer from './components/footer';
/*render(
    <Provider store= {store}>
        <div>
            <Menu />
            <ProductsList/>
           <Footer />
        </div>
    
    </Provider>, document.getElementById('app')
);
*/







//store.dispatch(addToCart([{_id: 1}]))




