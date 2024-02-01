import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  doc, getDoc
} from "firebase/firestore";

// This hook rescue post per id
export const useFetchDocument = (docCollection, id) =>{
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading]  = useState(null)

    // Memory leak
    const [cancelled, setCancelled] = useState(false)

    // Every time that receive any data, wheter a docCollection, a serach or uid from user
    // UseEffect will be try receive datas from Data Bank
    useEffect(() =>{
        async function loadDocument(){
            if(cancelled){
                return
            }

            setLoading(true)

            try {
                // Catching reference of our document
                const docRef = await doc(db, docCollection, id)

                // Pass for database 
                const docSnap = await getDoc(docRef)

                setDocument(docSnap.data())
                setLoading(false)

            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }

        // Callback in your function
        loadDocument()

    }, [doc, getDoc])

    // All the time which page is updated the ""cancelled" is set as true, so that avoid memory leak

    useEffect(()=>{
        return () => setCancelled(true)
    },[])

    return {document, loading, error}
}