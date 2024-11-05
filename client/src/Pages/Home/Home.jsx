import AllCategories from "../../Components/AllCategories/AllCategories";
import Banner from "../../Components/Banner/Banner";
import ShortFeature from "../../Components/ShortFeature/ShortFeature";
import useAuthContext from "../../Hooks/useAuthContext";

const Home = () => {
    const { user } = useAuthContext();
    console.log(user);
    return (
        <div>
            <Banner></Banner>
            <ShortFeature></ShortFeature>
            <AllCategories></AllCategories>
        </div>
    );
};

export default Home;