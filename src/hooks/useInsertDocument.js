import { useState, useEffect, useReducer} from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState =  {
    loading: null,
    error: null
}

const insertReducer = (state, action) =>{
    switch(action.type){
        case "LOADING":
            return{loading: true, error: null}
        case "INSERTED_DOC":
            return{loading: false, error: null}
        case "ERROR":
            return{loading: false, error: action.payload}
        default: 
            return state
    }
}

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState)

    // Deal with memory leak

    const [cancelled, setCancelled] = useState(false)


    function checkCancelBeforeDispatch(action){
        if(!cancelled){
            dispatch(action)
        }
    }

    const insertDocument = async(document) =>{
        // action 1 - Loading document
        checkCancelBeforeDispatch({
            type: 'LOADING',
        })

        try {
            // Creating a new Document with the exectaly hour of your creation
            const newDocument = {...document, createdAt: Timestamp.now()}

            // Basically the first argument it will search our database for the collection that we passed as an argument to the function
            // And the second argument is the document that has been inserted in our collection
            const insertDocument = await addDoc(
              collection(db, docCollection),
              newDocument
            );
            // action 2 - Document inserted
            checkCancelBeforeDispatch({
                type: 'INSERTED_DOC',
                payload: insertDocument
            })

        } catch (error) {
            // action 3 - error in insert document
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message
            })
        }
    }
    

    // All the time which page is updated the ""cancelled" is set as true, so that avoid memory leak
    useEffect(()=>{
        return () => setCancelled(true)
    },[])
    return { insertDocument, response };
}