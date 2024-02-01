import { useState, useEffect, useReducer} from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState =  {
    loading: null,
    error: null
}

const deleteReducer = (state, action) =>{
    switch(action.type){
        case "LOADING":
            return{loading: true, error: null}
        case "DELETED_DOC":
            return{loading: false, error: null}
        case "ERROR":
            return{loading: false, error: action.payload}
        default: 
            return state
    }
}

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState)

    // Deal with memory leak

    const [cancelled, setCancelled] = useState(false)


    function checkCancelBeforeDispatch(action){
        if(!cancelled){
            dispatch(action)
        }
    }

    const deleteDocument = async(id) =>{
        // action 1 - Loading document
        checkCancelBeforeDispatch({
            type: 'LOADING',
        })

        try {
            //  delivering the document that we want exclude and user uid

            const deletedDocument = await deleteDoc(doc(db,docCollection, id))
            checkCancelBeforeDispatch({
                type: 'DELETED_DOC',
                payload: deleteDocument
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
    return { deleteDocument, response };
}