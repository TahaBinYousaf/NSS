import PropTypes from 'prop-types';

const Ads = ({ img }) => {
    return (
        <div className='flex justify-center items-center h-full w-full'>
            <img
                src={img}
                alt='Ad'
                className='w-full py-10 px-10 cursor-pointer'
            />
        </div>
    );
};

// Add prop validation
Ads.propTypes = {
    img: PropTypes.string.isRequired
};

export default Ads;