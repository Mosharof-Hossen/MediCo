import PropTypes from 'prop-types';
import useAuthContext from '../Hooks/useAuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import useFetchUserInfo from '../API/useFetchUserInfo';

const PrivateAdminRouter = ({ children }) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();
    const { data: userInfo,  } = useFetchUserInfo();
    console.log(userInfo);
    if (loading || !(userInfo?.role == "admin")) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }

    if (user && (userInfo?.role == "admin")) {
        return children
    }
    return <Navigate to={"/login"} state={location.pathname}></Navigate>
};

PrivateAdminRouter.propTypes = {
    children: PropTypes.node
};
export default PrivateAdminRouter;