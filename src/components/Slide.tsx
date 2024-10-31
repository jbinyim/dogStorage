import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import banner from "../img/유튜브 배너.png";
import banner2 from "../img/인스타배너.png";

const Wrapper = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: 30px auto 100px;
  .swiper-slide {
    width: 1300px;
    height: 335px;
    border-radius: 30px;
    overflow: hidden;
  }
`;

const banners = [banner, banner2];

const Slide = () => {
  return (
    <Wrapper>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {banners.map((item, idx) => (
          <SwiperSlide key={idx}>
            <img src={item} alt="banner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default Slide;
