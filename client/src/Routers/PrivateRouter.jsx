import PropTypes from 'prop-types';
import useAuthContext from '../Hooks/useAuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();
    if (loading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }

    if (user) {
        return children
    }
    return <Navigate to={"/login"} state={location.pathname}></Navigate>
};

PrivateRouter.propTypes = {
    children: PropTypes.node
};

export default PrivateRouter;