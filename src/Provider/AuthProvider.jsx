import React, { useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';
import { useState } from 'react';

const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) =>{
        setLoading(false)
        return createUserWithEmailAndPassword(auth,email,password)
    }

   

    const googleLogin =()=>{
        return signInWithPopup(auth, googleProvider)
    }

    const updatedProfile = (profile)=>{
        return updateProfile(auth.currentUser,profile)
    }

   

    const logOut =()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
             setLoading(false)
            setUser(currentUser)
        })
        return ()=>{
            unSubscribe()
        }
    },[])

    const authInfo ={
        googleLogin,
        createUser,
        user,
        setUser,
        loading,
        setLoading,
        updatedProfile,
        logOut,
    }
    return (
        <AuthContext value={authInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;