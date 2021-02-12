import React from "react";
import Carousel from "./Carousel"
import List from "./List"

const home = () => {
  return <div>
    <Carousel />
    <div style={{textAlign: "center", fontSize: "48px"}}>此处应该有个很好的搜索框</div>
    <List />
  </div>;
};

export default home;
