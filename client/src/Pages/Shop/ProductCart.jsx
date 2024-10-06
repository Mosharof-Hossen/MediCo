import PropTypes from 'prop-types';


const ProductCart = ({ item }) => {
    const { image, itemName, company, itemGenericName, itemMassUnit, discountPercentage, category, perUnitPrice, application, shortDescription } = item
    return (
        <div className="card card-compact bg-base-100 rounded shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="ProductImage" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-primary-c">{itemName}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>

            </div>
        </div>
    );
};


ProductCart.propTypes = {
    item: PropTypes.object
};


export default ProductCart;