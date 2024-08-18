import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setOpenedFiltersCategory, setFiltersCategory } from "../../redux/slices/categories";

const filterArr = [
  { title: "По популярности", option: "rating", value: "desc" },
  { title: "От дешевых к дорогим", option: "actual_price", value: "asc" },
  { title: "От дорогих к дешевым", option: "actual_price", value: "desc" },
];

function FilterBlock() {
  const dispatch = useDispatch();
  const { filters, isActiveFilters } = useSelector(({ categories }) => categories);

  const filterBlock = React.useRef();

  const isOpenedCategory = React.useCallback(() => {
    !isActiveFilters ? dispatch(setOpenedFiltersCategory(true)) : dispatch(setOpenedFiltersCategory(false));
  }, [isActiveFilters]);

  const onSelectFilter = React.useCallback((item) => {
    dispatch(setFiltersCategory(item));
    dispatch(setOpenedFiltersCategory(false));
  }, []);

  React.useEffect(() => {
    if (!isActiveFilters) return;

    const onClickOutside = (e) => {
      if (!filterBlock.current.contains(e.target)) dispatch(setOpenedFiltersCategory(false));
    };

    document.body.addEventListener("click", onClickOutside);

    return () => {
      document.body.removeEventListener("click", onClickOutside);
    };
  }, [isActiveFilters]);

  return (
    <div className="category-filter" ref={filterBlock}>
      <button className={classNames("category-filter__button", isActiveFilters && "_active")} onClick={isOpenedCategory} type="button">
        <i className="category-filter__button-icon">
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 2.25C8 2.71413 8.18437 3.15925 8.51256 3.48744C8.84075 3.81563 9.28587 4 9.75 4C10.2141 4 10.6592 3.81563 10.9874 3.48744C11.3156 3.15925 11.5 2.71413 11.5 2.25C11.5 1.78587 11.3156 1.34075 10.9874 1.01256C10.6592 0.684374 10.2141 0.5 9.75 0.5C9.28587 0.5 8.84075 0.684374 8.51256 1.01256C8.18437 1.34075 8 1.78587 8 2.25Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M1 2.25H8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.5 2.25H15" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M2.75 7.5C2.75 7.96413 2.93437 8.40925 3.26256 8.73744C3.59075 9.06563 4.03587 9.25 4.5 9.25C4.96413 9.25 5.40925 9.06563 5.73744 8.73744C6.06563 8.40925 6.25 7.96413 6.25 7.5C6.25 7.03587 6.06563 6.59075 5.73744 6.26256C5.40925 5.93437 4.96413 5.75 4.5 5.75C4.03587 5.75 3.59075 5.93437 3.26256 6.26256C2.93437 6.59075 2.75 7.03587 2.75 7.5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M1 7.5H2.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.25 7.5H15" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M10.625 12.75C10.625 13.2141 10.8094 13.6592 11.1376 13.9874C11.4658 14.3156 11.9109 14.5 12.375 14.5C12.8391 14.5 13.2842 14.3156 13.6124 13.9874C13.9406 13.6592 14.125 13.2141 14.125 12.75C14.125 12.2859 13.9406 11.8408 13.6124 11.5126C13.2842 11.1844 12.8391 11 12.375 11C11.9109 11 11.4658 11.1844 11.1376 11.5126C10.8094 11.8408 10.625 12.2859 10.625 12.75Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M1 12.75H10.625" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.125 12.75H15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </i>
        <span className="category-filter__button-text">Фильтры</span>
      </button>
      <ul className={classNames("category-filter__dropdown", isActiveFilters && "_active")}>
        {filterArr.map((item, idx) => (
          <li className={classNames("category-filter__item", filters === item && "_active")} onClick={() => onSelectFilter(item)} key={`${item.title}_${idx}`}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(FilterBlock);
