// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const ShortFeature = () => {
    return (
        <div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='bg-green-200 w-full'>
                        <h4>Health Care</h4>
                        <p>Care Comes to You</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-green-200 w-full'>
                        <h4>Health Care</h4>
                        <p>Care Comes to You</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-green-200 w-full'>
                        <h4>Health Care</h4>
                        <p>Care Comes to You</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='bg-green-200 w-full'>
                        <h4>Health Care</h4>
                        <p>Care Comes to You</p>
                    </div>
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
};

export default ShortFeature;