import PropTypes from 'prop-types';


const ProductCart = ({ item }) => {
    const { image, itemName, company, itemGenericName, itemMassUnit, discountPercentage, category, perUnitPrice, application, shortDescription } = item
    const priceAfterDiscount = parseInt(perUnitPrice - (perUnitPrice * (discountPercentage / 100)));
    return (
        <div className="card card-compact bg-base-100 rounded shadow-xl relative">
            <figure>
                <img
                    src={image}
                    alt="ProductImage" />
            </figure>
            {
                discountPercentage > 0
                &&
                <button className="absolute border   bg-white top-1 rounded-r-full text-xs p-2 font-semibold text-red-500">OFF <span className="bg-red-500 text-white rounded-full p-1">{discountPercentage}%</span></button>

            }
            <div className="card-body  ">
                <h2 className="text-lg font-semibold text-primary-c">{itemName} </h2>
                <p className="text-gray-500 text-xs">{application}</p>
                <div className="space-y-1 flex justify-between items-center">
                    <div className="text-gray-500">
                        {
                            discountPercentage > 0 && <p className="line-through text-sm">${perUnitPrice}</p>
                        }
                        <p className="text-xl font-semibold">${priceAfterDiscount}</p>
                    </div>
                    <button className="px-3 py-2  bg-primary-c h-fit text-white rounded text-xs">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};


ProductCart.propTypes = {
    item: PropTypes.object
};


export default ProductCart;