import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthContext from '../Hooks/useAuthContext';
import useFetchUserInfo from '../API/useFetchUserInfo';

const PrivateSellerRouter = ({ children }) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();
    const { data: userInfo, } = useFetchUserInfo();
    if (loading || !(userInfo?.role == "seller")) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }

    if (user && (userInfo?.role == "seller")) {
        return children
    }
    return <Navigate to={"/login"} state={location.pathname}></Navigate>
};

PrivateSellerRouter.propTypes = {
    children: PropTypes.node
};

export default PrivateSellerRouter;