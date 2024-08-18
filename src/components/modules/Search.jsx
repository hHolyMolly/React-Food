import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

import instance from "../../instance";

import { setIsSearchOpen, setSearchDropdownItems, setSearchBy } from "../../redux/slices/search";

import { Button } from "../chuncks";

function Search({ isPhone }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isActive, itemsDropdown } = useSelector(({ search }) => search);

  const [searchValue, setSearchValue] = React.useState("");
  const [searchOpened, setSearchOpened] = React.useState(false);

  const inputRef = React.useRef();
  const searchRef = React.useRef();

  const onInputChange = useCallback(
    debounce((e) => {
      setSearchValue(e.target.value);
    }, 300)
  );

  const onInputCloseSearch = useCallback((e) => {
    if (e.target.value.length > 0) {
      setSearchOpened(true);
    } else {
      setSearchOpened(false);
      dispatch(setIsSearchOpen(false));
    }
  });

  const onInputFocus = useCallback((e) => {
    e.target.value.length > 0 ? dispatch(setIsSearchOpen(true)) : dispatch(setIsSearchOpen(false));
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();

    if (searchValue.length > 0) {
      navigate(`/search/?q=${searchValue}`);
      setSearchValue("");

      inputRef.current.value = "";
      setSearchOpened(false);
      dispatch(setIsSearchOpen(false));
      dispatch(setSearchBy(decodeURI(searchValue)));
    }
  };

  const onCloseSearch = () => {
    dispatch(setIsSearchOpen(false));
    setSearchValue("");
    setSearchOpened(false);
    inputRef.current.value = "";
  };

  const onClearSearch = () => {
    onCloseSearch();
    inputRef.current.focus();
  };

  React.useEffect(() => {
    if (!isActive) return;

    const onOutsideSearch = (e) => {
      if (!searchRef.current.contains(e.target)) dispatch(setIsSearchOpen(false));
    };

    document.body.addEventListener("click", onOutsideSearch);

    return () => {
      document.body.removeEventListener("click", onOutsideSearch);
    };
  }, [isActive]);

  React.useEffect(() => {
    async function loadSearchDropdown() {
      try {
        const { data } = await instance({
          url: `Products/?search=${searchValue}&page=1&limit=3`,
          method: "GET",
        });
        dispatch(setSearchDropdownItems(data));

        searchOpened ? dispatch(setIsSearchOpen(true)) : dispatch(setIsSearchOpen(false));
      } catch (error) {}
    }
    loadSearchDropdown();

    if (searchValue.length === 0) {
      inputRef.current.value = "";
      setSearchOpened(false);
      dispatch(setIsSearchOpen(false));
    }
  }, [searchValue]);

  return (
    <form className="search" onSubmit={(e) => onSearchSubmit(e)} method="get" autoComplete="off" ref={searchRef}>
      <div className="search__item">
        {!isPhone && (
          <label className="search__icon" htmlFor="main-search">
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.75 16.25L11.25 11.75" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M2.25 8C2.25 8.68944 2.3858 9.37213 2.64963 10.0091C2.91347 10.646 3.30018 11.2248 3.78769 11.7123C4.2752 12.1998 4.85395 12.5865 5.49091 12.8504C6.12787 13.1142 6.81056 13.25 7.5 13.25C8.18944 13.25 8.87213 13.1142 9.50909 12.8504C10.146 12.5865 10.7248 12.1998 11.2123 11.7123C11.6998 11.2248 12.0865 10.646 12.3504 10.0091C12.6142 9.37213 12.75 8.68944 12.75 8C12.75 7.31056 12.6142 6.62787 12.3504 5.99091C12.0865 5.35395 11.6998 4.7752 11.2123 4.28769C10.7248 3.80018 10.146 3.41347 9.50909 3.14963C8.87213 2.8858 8.18944 2.75 7.5 2.75C6.81056 2.75 6.12787 2.8858 5.49091 3.14963C4.85395 3.41347 4.2752 3.80018 3.78769 4.28769C3.30018 4.7752 2.91347 5.35395 2.64963 5.99091C2.3858 6.62787 2.25 7.31056 2.25 8Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>
        )}
        <input
          className="search__input"
          onChange={(e) => {
            onInputChange(e);
            onInputCloseSearch(e);
          }}
          onFocus={onInputFocus}
          id="main-search"
          name="q"
          placeholder="Поиск..."
          type="text"
          autoComplete="off"
          ref={inputRef}
        />
        {searchOpened && <button className="search__clear _close" onClick={onClearSearch} type="button"></button>}
        <div className={classNames("search__dropdown search-dropdown", isActive && "_active")}>
          <ul className="search-dropdown__list">
            {itemsDropdown && itemsDropdown.length > 0 ? (
              itemsDropdown.map((item, key) => (
                <li className="search-dropdown__item search-dropdown-product" onClick={onCloseSearch} key={`search-${key}`}>
                  <Link className="search-dropdown-product__link" to={`/category/${item.category}/${item.id}`}>
                    <div className="search-dropdown-product__image">
                      <img src={`./img/sections/products/${item.category}/${item.images[0].imageUrl}`} alt={item.title} />
                    </div>
                    <div className="search-dropdown-product__row">
                      <h5 className="search-dropdown-product__title">{item.title}</h5>
                      <p className="search-dropdown-product__text">{item.contain}</p>
                      <strong className="search-dropdown-product__price">{item.price.value}₴</strong>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="search-dropdown__item search-dropdown__item_empty">По вашему запросу ничего не найдено. Уточните свой запрос</li>
            )}
          </ul>
        </div>
      </div>
      {!isPhone && (
        <Button className="search__send" type="submit" orange>
          Найти
        </Button>
      )}
    </form>
  );
}

export default React.memo(Search);
