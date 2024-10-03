import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import SignUp from "../Pages/SignUp/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: '/shop',
                element: <Shop></Shop>
            },
            {
                path: "/sign-up",
                element: <SignUp></SignUp>
            }
        ]
    }
])



export default router;