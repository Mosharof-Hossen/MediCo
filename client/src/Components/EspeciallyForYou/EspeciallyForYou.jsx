import SectionTitle from "../SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaAddressBook, FaFlask, FaHandHoldingMedical, FaHeadset, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './especially.css';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

const EspeciallyForYou = () => {
    return (
        <div>
            <SectionTitle heading={"Especially For You"}></SectionTitle>
            <div className='my-5 px-5'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    breakpoints={{
                        400: {
                            slidesPerView: 2, // 2 slides per view for screens >= 640px
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3, // 3 slides per view for screens >= 768px
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4, // 4 slides per view for screens >= 1024px
                            spaceBetween: 40,
                        },
                    }}

                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide className='especiallySlide'>
                        <div className='text-left bg-gradient-to-br p-5 from-white to-cyan-400 rounded-lg rounded-tr-[120px] h-full flex justify-center items-center w-full '>
                            <div className=' w-full h-full flex items-center relative'>
                                <div className="space-y-1">
                                    <h4 className='font-semibold text-xl'>Order</h4>
                                    <p className='text-2xl font-bold'>Via WhatsApp</p>
                                    <p>0180000000</p>
                                    <button className="btn w-full text-cyan-500 absolute bottom-0">Call Now</button>
                                    <div className="absolute top-0 right-0 bg-cyan-500 p-2 rounded-full">
                                        <FaWhatsapp className="text-4xl text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className='especiallySlide'>
                        <div className='text-left bg-gradient-to-br p-5 from-white to-lime-400 rounded-lg rounded-tr-[120px] h-full flex justify-center items-center w-full '>
                            <div className=' w-full h-full flex items-center relative'>
                                <div className="space-y-1">
                                    <h4 className='font-semibold text-xl'>Upto</h4>
                                    <p className='text-2xl font-bold'>10% OFF</p>
                                    <p>+ Cashback</p>
                                    <button className="btn w-full text-lime-500 absolute bottom-0">Upload Prescription</button>
                                    <div className="absolute top-0 right-0 bg-lime-500 p-2 rounded-full">
                                        <FaAddressBook className="text-4xl text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className='especiallySlide'>
                        <div className='text-left bg-gradient-to-br p-5 from-white to-indigo-400 rounded-lg rounded-tr-[120px] h-full flex justify-center items-center w-full '>
                            <div className=' w-full h-full flex items-center relative'>
                                <div className="space-y-1">
                                    <h4 className='font-semibold text-xl'>Upto</h4>
                                    <p className='text-2xl font-bold'>60% OFF</p>
                                    <p>+ Cashback</p>
                                    <button className="btn w-full text-indigo-500 absolute bottom-0">Health Care</button>
                                    <div className="absolute top-0 right-0 bg-indigo-500 p-2 rounded-full">
                                        <FaHandHoldingMedical className="text-4xl text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className='especiallySlide'>
                        <div className='text-left bg-gradient-to-br p-5 from-white to-yellow-400 rounded-lg rounded-tr-[120px] h-full flex justify-center items-center w-full '>
                            <div className=' w-full h-full flex items-center relative'>
                                <div className="space-y-1">
                                    <h4 className='font-semibold text-xl'>Upto</h4>
                                    <p className='text-2xl font-bold'>10% OFF</p>
                                    <p className="flex items-center"><FaPhoneAlt />16000</p>
                                    <button className="btn w-full text-yellow-500 absolute bottom-0">Call To Order</button>
                                    <div className="absolute top-0 right-0 bg-yellow-500 p-2 rounded-full">
                                        <FaHeadset className="text-4xl text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide className='especiallySlide'>
                        <div className='text-left bg-gradient-to-br p-5 from-white to-pink-400 rounded-lg rounded-tr-[120px] h-full flex justify-center items-center w-full '>
                            <div className=' w-full h-full flex items-center relative'>
                                <div className="space-y-1">
                                    <h4 className='font-semibold text-xl'>Upto</h4>
                                    <p className='text-2xl font-bold'>25% OFF</p>
                                    <p className="flex items-center">+ Cashback</p>
                                    <button className="btn w-full text-pink-500 absolute bottom-0">Lab Test</button>
                                    <div className="absolute top-0 right-0 bg-pink-500 p-2 rounded-full">
                                        <FaFlask className="text-4xl text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>




                </Swiper>
            </div>
        </div>
    );
};

export default EspeciallyForYou;