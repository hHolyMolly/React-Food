import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";

import { setFiltersCategory } from "../../redux/slices/categories";

import { ProductCard, ProductLoading } from "../chuncks";

function Products({
  title = "Заголовок",
  isSlider = false,
  isLoading = true,
  items,
  filter = false,
  itemsLoading = 5,
}) {
  const dispatch = useDispatch();
  const { filters } = useSelector(({ categories }) => categories);

  const deleteFilters = () => dispatch(setFiltersCategory(null));

  return (
    <section className="products-section">
      <div className="_container">
        <div className="products-section__body">
          {title && (
            <div className="products-section__top">
              <div className="products-section__row">
                <h2 className="products-section__title">{title}</h2>
                {filter && filters !== null && (
                  <button
                    className="products-section__filter"
                    onClick={deleteFilters}
                    type="button"
                  >
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 4.5H17"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 8.5V14.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11 8.5V14.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 4.5L3 16.5C3 17.0304 3.21071 17.5391 3.58579 17.9142C3.96086 18.2893 4.46957 18.5 5 18.5H13C13.5304 18.5 14.0391 18.2893 14.4142 17.9142C14.7893 17.5391 15 17.0304 15 16.5L16 4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 4.5V1.5C6 1.23478 6.10536 0.98043 6.29289 0.792893C6.48043 0.605357 6.73478 0.5 7 0.5H11C11.2652 0.5 11.5196 0.605357 11.7071 0.792893C11.8946 0.98043 12 1.23478 12 1.5V4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Сбросить фильтры
                  </button>
                )}
              </div>
              {filter && filter}
            </div>
          )}
          {isSlider ? (
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              navigation
              spaceBetween={20}
              breakpoints={{
                991.98: {
                  slidesPerView: 4,
                },
                767.98: {
                  slidesPerView: 3,
                },
                479.98: {
                  slidesPerView: 2,
                },
              }}
            >
              {isLoading
                ? [...Array(itemsLoading)].map((item, idx) => (
                    <SwiperSlide key={`product-loading_${idx}`}>
                      <ProductLoading />
                    </SwiperSlide>
                  ))
                : items.map((item, idx) => (
                    <SwiperSlide key={`${item.title}_${idx}`}>
                      <ProductCard {...item} />
                    </SwiperSlide>
                  ))}
            </Swiper>
          ) : (
            <div className="products-section__items">
              {isLoading
                ? [...Array(itemsLoading)].map((item, idx) => (
                    <ProductLoading key={`product-loading_${idx}`} />
                  ))
                : items.map((item, idx) => (
                    <ProductCard key={`${item.title}_${idx}`} {...item} />
                  ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;
