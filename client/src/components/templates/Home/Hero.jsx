import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Hero = () => {
  return (
    <div data-aos="fade-up" className="mt-2 p-1">
      <Swiper
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: 2,
          },
        }}
        spaceBetween={10}
        modules={[Autoplay]}
        grabCursor
        autoplay={{
          delay: 2300,
        }}
        loop
      >
        <SwiperSlide>
          <img
            src="https://images.mobileshop.eu/1703250224/banner/13669135322913airpods.jpg"
            alt=""
            className="rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-lg"
            src="https://images.mobileshop.eu/1703250250/banner/17097a-54.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-lg"
            src="https://images.mobileshop.eu/1703250362/banner/11671Screenshot_3.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
