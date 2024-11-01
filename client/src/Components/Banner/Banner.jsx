import useFetchGetSlideData from "../../API/useFetchGetSlideData";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStethoscope } from "react-icons/fa";

import 'swiper/css';
import 'swiper/css/navigation';
import "./slideStyle.css"
import { Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";

const Banner = () => {
    const { data: slideData, isLoading, isError } = useFetchGetSlideData();
    if (isLoading) {
        return <div className='text-center'><span className='loading loading-bars loading-lg'></span></div>
    }
    if (isError) {
        return
    }
    console.log(slideData);
    return (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    slideData?.map((slide, i) => <SwiperSlide key={i}>
                        <div
                            className="hero h-[500px] bg-center bg-no-repeat bg-cover"
                            style={{
                                backgroundImage: `url(${slide?.image})`,
                            }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-neutral-content text-center">
                                <div className="md:max-w-lg max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">{slide?.itemName}</h1>
                                    <p className="mb-5">
                                        {
                                            slide?.shortDescription
                                        }
                                    </p>
                                    <h1 className="text-6xl font-semibold">
                                        <span className="text-3xl">UpTo</span><span className="text-primary-c">{slide?.discountPercentage}%</span> Discount 
                                    </h1>
                                    <div className="mt-6">
                                        <Link to={"/shop"}><button className="btn bg-primary-c text-white border-none text-xl">Explore <FaStethoscope /></button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }


            </Swiper>
        </>
    );
};

export default Banner;