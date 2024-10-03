import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';

const useAuthContext = () => {
    return useContext(AuthContext)
};

export default useAuthContext;