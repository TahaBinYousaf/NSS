import React from "react";
import Categories from "../components/Categories";
import HomePageCollection from "@/components/HomePageCollection";

const Home = () => {
  return (
    <div className="container mx-auto max-w-screen-2xl">
      <Categories header="ALL CATEGORIES" />
      <HomePageCollection category="Items for sale" limit={4} />
      <HomePageCollection category="Items for rent" limit={4} />
      <HomePageCollection category="Events" limit={4} />
    </div>
  );
};

export default Home;
