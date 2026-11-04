import React from "react";
import Hero from "../components/Hero";
import CategoryNav from "../components/CategoryNav";
import RestaurantCard from "../components/RestaurantCard";
import FoodMenu from "../components/FoodMenu";

function Home() {
  return (
    <>
      <Hero />
      <CategoryNav />
      <RestaurantCard />
      <FoodMenu />
    </>
  );
}

export default Home;