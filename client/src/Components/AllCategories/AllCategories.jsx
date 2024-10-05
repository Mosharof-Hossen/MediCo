import useFetchGetAllCategories from "../../API/useFetchGetAllCategories";
import SectionTitle from "../SectionTitle/SectionTitle";
import CategoryCard from "./CategoryCard";

const AllCategories = () => {
    const { data, isError, isLoading } = useFetchGetAllCategories();
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    return (
        <div className="p-5">
            <SectionTitle heading="Explore Our Categories" subHeading="Browse through our wide range of health and wellness products to find exactly what you need"></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {
                    data.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default AllCategories;