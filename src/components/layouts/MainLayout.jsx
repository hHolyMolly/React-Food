import React from "react";
import { Outlet } from "react-router-dom";

import { Banner, Header, Footer, ModalWrapper } from "../modules";

function MainLayout() {
  return (
    <div className="wrapper">
      <Banner />
      <Header />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
      <ModalWrapper />
    </div>
  );
}

export default React.memo(MainLayout);
