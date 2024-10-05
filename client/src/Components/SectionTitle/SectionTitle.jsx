import PropTypes from 'prop-types';

const SectionTitle = ({ heading, subHeading }) => {

    return (
        <div className='text-center space-y-5 my-8'>
            <h2 className='md:text-4xl text-3xl font-berkshire-c font-bold '>{heading}</h2>
            <p className='text-base text-gray-500'>{subHeading}</p>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
};

export default SectionTitle;