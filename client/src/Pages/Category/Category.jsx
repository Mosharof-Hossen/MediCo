import { useParams } from 'react-router-dom';
import useFetchProductByCategory from '../../API/useFetchProductByCategory';

const Category = () => {
    const category = useParams();
    const { data: products, isError, isLoading } = useFetchProductByCategory(category.category)

    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(products);
    return (
        <div>

        </div>
    );
};

export default Category;