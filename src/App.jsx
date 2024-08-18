import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setLoadBasket } from "./redux/slices/basket";
import { setLoadFavorite } from "./redux/slices/favorite";

import MainLayout from "./components/layouts/MainLayout";

import { Home, Basket, Favorite, Search, Category, FullCard, NotFound } from "./pages";

const userBasket = JSON.parse(localStorage.getItem("user-basket") || "[]");
const userFavorite = JSON.parse(localStorage.getItem("user-favorite") || "[]");

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
  );
}

export default App;
