import { useParams } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useFetchUserSelectedItem from "../../../API/SellerApi/useFetchUserSelectedItem";

const UserSelectedItems = () => {
    const { id } = useParams();

    const { data: items, isLoading, error } = useFetchUserSelectedItem(id);
    console.log(items);
    return (
        <div>
            <SectionTitle ></SectionTitle>

        </div>
    );
};

export default UserSelectedItems;