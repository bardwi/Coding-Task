"use strict"


//Books reducers
export function booksReducers(state={
    notebooks:[]
    }, action){
    switch(action.type) {
        case "GET_BOOKS":
        return {...state, notebooks:[...action.payload]}
        break;
        case "POST_BOOK":
        return {...state, notebooks:[...state.notebooks, ...action.payload], msg:'Saved! Click to continue',
        style:'success', validation:'success'}
        break;
        case "POST_BOOK_REJECTED":
        return {...state, msg: 'Please, try again', style:'danger', validation: 'error'}
        break;
        case "RESET_BUTTON":
        return {...state, msg: null, style:'primary', validation:null}
        break;

        case "DELETE_BOOK":
        // Create a copy of the current array of books
 
        const currentBookToDelete = [...state.notebooks]
        // Determine at which index in books array is the book to be deleted
 
        const indexToDelete = currentBookToDelete.findIndex(
            function(notebook) {
                return notebook._id.toString() == action.payload;
            }
        )
        //use slice to remove the book at the specific index
        return {notebooks: [...currentBookToDelete.slice(0, indexToDelete),...currentBookToDelete.slice(indexToDelete + 1)]}
        break;
 
        case "UPDATE_BOOK":
        // Create a copy of the current array of books
 
        const currentBookToUpdate = [...state.notebooks];
        // Determine at which index in books array is the book to be deleted
 
        const indexToUpdate = currentBookToUpdate.findIndex(
            function(notebook) {
                return notebook._id === action.payload._id;
            }
        )
        // Create a new bok object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we concat methods too
 
         const newBookToUpdate = {
             ...currentBookToUpdate[indexToUpdate],
             title: action.payload.title
         }
         // This Log has the purpose to show you how newBookToUpdate looks like
         console.log("What is it newBookToUpdate", newBookToUpdate);
 
        //use slice to remove the book at the specific index
        return {notebooks: [...currentBookToUpdate.slice(0, indexToUpdate),newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate + 1)]}
        break; 
 
       
    }
    return state;
 }