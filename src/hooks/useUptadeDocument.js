import { useState, useEffect, useReducer} from "react";
import { db } from "../firebase/config";
import { updateDoc, doc} from "firebase/firestore";

const initialState =  {
    loading: null,
    error: null
}

const uptadeReducer = (state, action) =>{
    switch(action.type){
        case "LOADING":
            return{loading: true, error: null}
        case "UPTADED_DOC":
            return{loading: false, error: null}
        case "ERROR":
            return{loading: false, error: action.payload}
        default: 
            return state
    }
}

export const useUpdatedeDocument = (docCollection) => {
    const [response, dispatch] = useReducer(uptadeReducer, initialState)

    // Deal with memory leak

    const [cancelled, setCancelled] = useState(false)


    function checkCancelBeforeDispatch(action){
        if(!cancelled){
            dispatch(action)
        }
    }

    const updatedDocument = async(id, data) =>{
        // action 1 - Loading document
        checkCancelBeforeDispatch({
            type: 'LOADING',
        })

        try {
            //  delivering the document that we want update  and user uid
            const docRef = await doc(db, docCollection, id)
            const updatedDocument = await updateDoc(docRef, data)
            checkCancelBeforeDispatch({
                type: 'UPTADED_DOC',
                payload: updateDoc
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
    return { updatedDocument, response };
}