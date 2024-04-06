import React, { useEffect, useState, useContext } from "react";
import Header from "../components/modules/Header";
import Footer from "../components/modules/Footer";
import SideBar from "../components/templates/Shop/SideBar";
import Products from "../components/templates/Shop/Products";

import { Context } from "../context/MainContext";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { products } = useContext(Context);

  return (
    <div>
      <Header />
      <main className="flex flex-col gap-3 p-3 lg:flex-row">
        <div
          data-aos="fade-right"
          className="top-2 h-fit rounded-lg border border-muted p-3 shadow-sm lg:sticky lg:w-2/12"
        >
          <SideBar setFiltered={setFiltered} search={search} />
        </div>
        <div
          data-aos="fade-left"
          className="rounded-lg border border-muted p-3 shadow-sm lg:w-10/12"
        >
          <Products
            search={search}
            setSearch={setSearch}
            products={filtered ? filtered : products}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
