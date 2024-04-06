import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Autoplay, FreeMode, Thumbs } from "swiper/modules";
import { useState } from "react";

const Gallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        grabCursor
        autoplay={{
          delay: 2000,
        }}
        modules={[FreeMode, Thumbs, Autoplay]}
        className="mySwiper1 mb-10"
      >
        {images &&
          images.map((image) => (
            <SwiperSlide>
              <img className="rounded-lg" src={image} alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper"
      >
        {images &&
          images.map((image) => (
            <SwiperSlide>
              <img className="rounded-lg" src={image} alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Gallery;
