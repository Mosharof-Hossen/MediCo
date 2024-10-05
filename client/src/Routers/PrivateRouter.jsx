import React from 'react';
import PropTypes from 'prop-types';
import useAuthContext from '../Hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuthContext();
    // if(loading){
    //         return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    // }

    if (user) {
        return children
    }
    return <Navigate to={"/login"}></Navigate>
};

PrivateRouter.propTypes = {
    children: PropTypes.node
};

export default PrivateRouter;