import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) =>{
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading]  = useState(null)

    // Memory leak
    const [cancelled, setCancelled] = useState(false)

    // Every time that receive any data, wheter a docCollection, a serach or uid from user
    // UseEffect will be try receive datas from Data Bank
    useEffect(() =>{
        async function loadingData(){
            if(cancelled){
                return
            }

            setLoading(true)

            // Searching the collection in our database
            const collectionRef = await collection(db, docCollection)

            try {
                let q

                // Search by tag

                if (search) {
                  q = await query(
                    collectionRef,
                    where("tags", "array-contains", search),
                    orderBy("createdAt", "desc")
                  );
                } else if (uid) {
                    q = await query(
                        collectionRef,
                        // Select post via user uid
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc")
                        );
                } else {
                  // Searching for any data, using query in our collection and ordering by creation time
                  q = await query(collectionRef, orderBy("createdAt", "desc"));
                }

                // DashBoard

                // Mapping all data, and bringing the most up-to-date information if there are any changes
                await onSnapshot(q, (querySnapshot) =>{
                    setDocuments(
                        querySnapshot.docs.map((doc)=>({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                })

                setLoading(false)

            } catch (error) {
                console.log(error);
                setError(error.message)
                setLoading(false)
            }
        }

        // Callback in your function
        loadingData()

    }, [docCollection, search, uid, cancelled])

    // All the time which page is updated the ""cancelled" is set as true, so that avoid memory leak

    useEffect(()=>{
        return () => setCancelled(true)
    },[])

    return {documents, loading, error}
}