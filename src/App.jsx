import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setLoadBasket } from "./redux/slices/basket";
import { setLoadFavorite } from "./redux/slices/favorite";

import MainLayout from "./components/layouts/MainLayout";

const Home = lazy(() => import("./pages/Home"));
const Basket = lazy(() => import("./pages/Basket"));
const Favorite = lazy(() => import("./pages/Favorite"));
const Search = lazy(() => import("./pages/Search"));
const Category = lazy(() => import("./pages/Category"));
const FullCard = lazy(() => import("./pages/FullCard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const userBasket = getLocalStorage("user-basket");
const userFavorite = getLocalStorage("user-favorite");

function App() {
  const dispatch = useDispatch();

  const basketItems = useSelector((state) => state.basket.items);
  const favoriteItems = useSelector((state) => state.favorite.items);

  React.useEffect(() => {
    localStorage.setItem("user-basket", JSON.stringify(basketItems));
  }, [basketItems]);

  React.useEffect(() => {
    localStorage.setItem("user-favorite", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  React.useEffect(() => {
    dispatch(setLoadBasket(userBasket));
    dispatch(setLoadFavorite(userFavorite));

    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<div className="page-loading" />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="/favorite" element={<Favorite />} />
          <Route path="/basket" element={<Basket />} />

          <Route path="/search" element={<Search />} />

          <Route path="/category/:category" element={<Category />} />
          <Route path="/category/:category/:id" element={<FullCard />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
