"use strict";
import axios from 'axios';


//Get item
export function getBooks(){
   return function(dispatch){
       axios.get("/api/notebooks")
          .then(function(response){
            dispatch({type:"GET_BOOKS", payload:response.data })
          })
          .catch(function(err){
              dispatch({ type: "GET_BOOKS_REJECTED",payload: err })
          })
           
     }
}
  
// POST item
export function postBooks(notebook){
  return function(dispatch){
       axios.post("/api/notebooks", notebook)
       .then(function(response){
        dispatch({ type: "POST_BOOK", payload:response.data})
       })
       .catch(function(err){
          dispatch({type:"POST_BOOK_REJECTED", payload:"there was an error"})
       })
  }

}


//DELETE item
export function deleteBooks(id) {
    return function(dispatch){
        axios.delete("/api/notebooks/" + id)
           .then(function(response){
               dispatch({type:"DELETE_BOOK", payload:id})
           })
           .catch(function(err){
               dispatch({type:"DELETE_BOOK_REJECTED", payload: err})
           })
        }
    }
 
//UPDATE A item
export function updateBooks(notebook) {
    return {
            type: "UPDATE_BOOK",
            payload:notebook
        
            }
}

export function resetButton() {
    return {
            type: "RESET_BUTTON"
        
            }
     }

