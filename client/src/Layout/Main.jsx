import Navbar from '../Pages/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Footer/Footer';
import 'react-notifications-component/dist/theme.css'
import { ReactNotifications } from 'react-notifications-component'


const Main = () => {
    return (
        <>
            <ReactNotifications></ReactNotifications>

            <div className='max-w-6xl mx-auto min-h-screen flex flex-col' >
                <div className='flex-grow'>
                    <Navbar></Navbar>
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>
        </>

    );
};

export default Main;