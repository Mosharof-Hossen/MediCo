import useAuthContext from "../../Hooks/useAuthContext";

const Home = () => {
    const {user} = useAuthContext();
    console.log(user);
    return (
        <div>
            Home
        </div>
    );
};

export default Home;