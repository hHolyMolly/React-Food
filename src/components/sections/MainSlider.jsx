import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper";

import { Button } from "../chuncks";

const mainSliderArr = [
   {
      title: "Самые вкусные роллы только у нас!",
      imageUrl: "01.webp",
      link: "category/sushi",
   },
   {
      title: "Самая вкусная пицца только у нас!",
      imageUrl: "02.webp",
      link: "category/pizza",
   },
];

function MainSlider() {
   const [isLoading, setIsLoading] = React.useState(true);

   React.useEffect(() => {
      if (mainSliderArr) setTimeout(() => setIsLoading(false), 300);
   }, []);

   return (
      mainSliderArr.length > 0 && (
         <section className="main-slider">
            <div className="_container">
               {!isLoading ? (
                  <Swiper
                     className="main-slider__body"
                     modules={[Navigation, Autoplay, EffectFade, Pagination]}
                     slidesPerView={1}
                     spaceBetween={30}
                     navigation={mainSliderArr.length > 1 ? true : false}
                     pagination={{
                        clickable: true,
                     }}
                     loop={true}
                     effect={"fade"}
                     autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                     }}
                  >
                     {mainSliderArr.map((slide, idx) => (
                        <SwiperSlide key={`${slide.title}_${idx}`}>
                           <h1 className="main-slider__title">{slide.title}</h1>
                           <Button className="main-slider__button" href={`${slide.link}`} tag="Link" white>
                              Хочу
                           </Button>
                           <div className="main-slider__image _ibg">
                              <img src={`./img/sections/main-slider/${slide.imageUrl}`} loading="lazy" alt={slide.title} />
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               ) : (
                  <div className="main-slider__loading" title="loading...">
                     <div className="main-slider__loading-icon">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                     </div>
                  </div>
               )}
            </div>
         </section>
      )
   );
}

export default MainSlider;
