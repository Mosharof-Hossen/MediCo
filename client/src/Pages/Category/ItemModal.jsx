import PropTypes from 'prop-types';

const ItemModal = ({ item }) => {
    const { image, itemName, company, itemGenericName, itemMassUnit, discountPercentage, category, perUnitPrice, application, shortDescription } = item
    return (
        <div className="modal-box w-11/12 max-w-3xl space-y-5">
            {
                item && <>
                    <img src={image} alt="" className='rounded' />
                    <h3 className="font-bold text-lg">Name: {itemName}</h3>
                    <p className='text-gray-500'><span className='font-bold text-black'>Description:</span> <br /> {shortDescription}</p>
                    <div className="py-4">
                        <p className='text-gray-500'><span className='font-bold text-black'>Application:</span> {application}</p>
                        <p className='text-gray-500'><span className='font-bold text-black'>Company:</span> {company}</p>
                        <p className='text-gray-500'><span className='font-bold text-black'>Generic Name:</span> {itemGenericName}</p>
                        <p className='text-gray-500'><span className='font-bold text-black'>Item Mass Unit:</span> {itemMassUnit}</p>
                        <p className='text-gray-500'><span className='font-bold text-black'>Discount:</span> {discountPercentage}%</p>
                        <p className='text-gray-500'><span className='font-bold text-black'>Category:</span> {category}</p>
                        <p className='text-gray-500'><span className='font-bold text-black'>Price:</span> ${perUnitPrice}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn bg-primary-c text-white">Close</button>
                    </form>
                </>
            }
        </div>
    );
};

ItemModal.propTypes = {
    item: PropTypes.object
};

export default ItemModal;