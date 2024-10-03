import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from '../Firebase/Firebase';

export const AuthContext = createContext(null)

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState("Ok Vaiya")
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // Google Login
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const authInfo = {
        user,
        googleLogin,
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