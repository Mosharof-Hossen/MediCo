import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from '../Firebase/Firebase';

export const AuthContext = createContext(null)

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // Login by Email and Password
    const loginInByEmailPass = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
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
        loginInByEmailPass,
        logout
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