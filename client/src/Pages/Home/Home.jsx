import AllCategories from "../../Components/AllCategories/AllCategories";
import Banner from "../../Components/Banner/Banner";
import useAuthContext from "../../Hooks/useAuthContext";

const Home = () => {
    const { user } = useAuthContext();
    console.log(user);
    return (
        <div>
            <Banner></Banner>
            <AllCategories></AllCategories>
        </div>
    );
};

export default Home;