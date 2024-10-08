import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../Firebase/Firebase';

export const AuthContext = createContext(null)

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [waitForUser, setWaitForUser] = useState(false);

    // Create Account by Email and Password
    const createAccountByEmailPass = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign in By Email and pass
    const loginByEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Google Login
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const githubLogin = () => {
        return signInWithPopup(auth, githubProvider)
    }

    // Logout
    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                setWaitForUser(true)
            }
        })

        return () => {
            return unSubscribe();
        }
    }, [])

    console.log(user);
    const authInfo = {
        user,
        googleLogin,
        githubLogin,
        createAccountByEmailPass,
        loginByEmailAndPassword,
        logout,
        waitForUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProviders.propTypes = {
    children: PropTypes.node.isRequired,
};


export default AuthProviders;