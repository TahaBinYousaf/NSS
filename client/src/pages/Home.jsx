import React from "react";
import { LatestCollection1 } from "../components/LatestCollection1";
import { LatestCollection2 } from "../components/LatestCollection2";
import { LatestCollection3 } from "../components/LatestCollection3";
import Image1 from "../assets/img2.jpeg";
import Categories from "../components/Categories";

const Home = () => {
  return (
    <div className="container mx-auto max-w-screen-2xl">
      <Categories header="ALL CATEGORIES" />
      <LatestCollection1></LatestCollection1>
      <LatestCollection2></LatestCollection2>
      <LatestCollection3></LatestCollection3>
    </div>
  );
};

export default Home;
