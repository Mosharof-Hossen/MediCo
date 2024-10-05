import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    return (
        <Link to={`/products/${category.categoryNameId}`}>
            <div className="card card-compact bg-base-100 rounded shadow-xl hover:cursor-pointer">
                <figure>
                    <img
                        src={category.categoryImage}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">{category.categoryName}</h2>
                    <p className='text-center text-xs text-gray-500'>{category.description}</p>

                </div>
            </div>
        </Link>
    );
};

CategoryCard.propTypes = {
    category: PropTypes.object
};

export default CategoryCard;