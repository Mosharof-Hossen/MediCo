import Navbar from '../Pages/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Footer/Footer';

const Main = () => {
    return (
        <div className='max-w-6xl mx-auto min-h-screen flex flex-col' >
            <div className='flex-grow'>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;