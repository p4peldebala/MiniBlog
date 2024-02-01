import { db } from "../firebase/config";

import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut

 } from "firebase/auth";

 import { useState, useEffect } from 'react'

 export const useAuthentication = () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // clean up
    // handle with memory leak -> Basicaly useState which cancel the future action from our Components

    const [cancelled, setCancelled] = useState(false)
    const auth = getAuth()
    

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }

    }


    // Async function for createUser

    // Register
    const createUser = async(data) =>{
        checkIfIsCancelled()
        setLoading(true)
        setError(null)
        
        try {
            //Creating user with createUserWithEmailAndPassword for after add a name and id for our user
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            // updateProfile use own user and an object to uptade the user name
            await updateProfile(user, {displayName: data.name, id: data.id})
            console.log(user);
            setLoading(false)
            return user

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage
            if(error.message.includes('Password')){
                systemErrorMessage = 'Password must be 6 or more characters'
            } else if (error.message.includes('email-already')){
                systemErrorMessage = 'E- mail is already used'
            } else{
                systemErrorMessage = 'An error is found, please try again'
            }
            setLoading(false)
            setError(systemErrorMessage)
        }
        
    }
    //Logout - Sign Out

    const logout = () =>{
        checkIfIsCancelled()
        signOut(auth)
    }

    // Login - sign in -> Create a login
    
    const login = async(data) =>{
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {
            // Use function of firebase for sign in with email and passoword

            await signInWithEmailAndPassword(auth, data.email, data.password)

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);
            console.log(error.code);
            

            let systemErrorMessage
            if(error.message.includes('invalid-login-credentials')){
                systemErrorMessage = 'User or Passoword not found'
            } else{
                systemErrorMessage = 'An error is found, please try again'
            } 
            setLoading(false)
            setError(systemErrorMessage)
        }
    }   
    
    // useEffect to avoid memory leak => Always that the page is changed 
    useEffect(() =>{
        return() => setCancelled(true)
    },[])

    return {
      auth, 
      createUser,
      error,
      loading,
      logout,
      login,
    };
}
