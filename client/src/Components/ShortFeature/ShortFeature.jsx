// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './shortFeature.css';

// import required modules
import { Pagination } from 'swiper/modules';

const ShortFeature = () => {
    return (
        <div className='my-10 px-5'>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className='featureSlide'>
                    <div className='bg-gradient-to-br from-green-50 to-green-400 rounded-xl h-full flex justify-center items-center w-full '>
                        <div className='space-y-2'>
                            <h4 className='font-bold text-xl'>Health Care</h4>
                            <p className='text-sm text-gray-600'>Care Comes to You</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='featureSlide'>
                    <div className='bg-gradient-to-br from-orange-50 to-orange-400 rounded-xl h-full flex justify-center items-center w-full '>
                        <div className='space-y-2'>
                            <h4 className='font-bold text-xl'>MediCo Beauty</h4>
                            <p className='text-sm text-gray-600'>Glamour Delivered, Always Chic</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='featureSlide'>
                    <div className='bg-gradient-to-br from-blue-50 to-blue-400 rounded-xl h-full flex justify-center items-center w-full '>
                        <div className='space-y-2'>
                            <h4 className='font-bold text-xl'>Lab Test</h4>
                            <p className='text-sm text-gray-600'>Diagnosing Health, Delivering Hope</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='featureSlide'>
                    <div className='bg-gradient-to-br from-yellow-50 to-yellow-400 rounded-xl h-full flex justify-center items-center w-full '>
                        <div className='space-y-2'>
                            <h4 className='font-bold text-xl'>Pet and Vet</h4>
                            <p className='text-sm text-gray-600'>Your Pets joy non-stop</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='featureSlide'>
                    <div className='bg-gradient-to-br from-indigo-50 to-indigo-400 rounded-xl h-full flex justify-center items-center w-full '>
                        <div className='space-y-2'>
                            <h4 className='font-bold text-xl'>Food</h4>
                            <p className='text-sm text-gray-600'>Best food for the health</p>
                        </div>
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default ShortFeature;