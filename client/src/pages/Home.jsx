import React from "react";
import Header from "../components/modules/Header";
import Hero from "../components/templates/Home/Hero";
import LatestProducts from "../components/templates/Home/LatestProducts";
import Footer from "../components/modules/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <LatestProducts />
      <Footer />
    </div>
  );
};

export default Home;
