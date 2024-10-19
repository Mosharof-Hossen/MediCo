import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../Firebase/Firebase';
import usePublicAxios from '../Hooks/usePublicAxios';

export const AuthContext = createContext(null)

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [waitForUser, setWaitForUser] = useState(false);
    const publicAxios = usePublicAxios();
    const [loading, setLoading] = useState(true);

    // Create Account by Email and Password
    const createAccountByEmailPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign in By Email and pass
    const loginByEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Google Login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
    }

    // Logout
    const logout = () => {
        setLoading(true)
        localStorage.removeItem("token")
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                const jwt = {
                    email: currentUser.email,
                    uid: currentUser.uid
                }
                console.log(currentUser);
                const res = await publicAxios.post("/login", jwt)
                localStorage.setItem("token", res.data.token);
                setWaitForUser(true)
            }
        })

        return () => {
            return unSubscribe();
        }
    }, [publicAxios])

    console.log(user);
    const authInfo = {
        user,
        googleLogin,
        githubLogin,
        createAccountByEmailPass,
        loginByEmailAndPassword,
        logout,
        waitForUser,
        loading
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