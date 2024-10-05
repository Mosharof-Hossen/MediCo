import AllCategories from "../../Components/AllCategories/AllCategories";
import useAuthContext from "../../Hooks/useAuthContext";

const Home = () => {
    const { user } = useAuthContext();
    console.log(user);
    return (
        <div>
            <AllCategories></AllCategories>
        </div>
    );
};

export default Home;