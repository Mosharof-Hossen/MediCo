import PropTypes from 'prop-types';

const CategoryCard = ({ category }) => {
    console.log(category);
    return (
        <div className="card card-compact bg-base-100 rounded shadow-xl">
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
    );
};

CategoryCard.propTypes = {
    category: PropTypes.object
};

export default CategoryCard;