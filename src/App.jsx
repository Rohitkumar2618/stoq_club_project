import { Card } from "@nextui-org/react";

import { useParams } from "react-router-dom";

import { Link, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
// import PopularBaskets from "./components/PopularBaskets";

import All_Awail_Basket from "./components/All_Awail_Basket";

import BasketDetils from "./components/BasketDetils";

import Basket from "./components/Basket";

import MpopularBasket_details from "./components/MpopularBasket_details";

import Login from "./components/Auth/Login";

// import LoginPage from "./components/Auth/LoginPage";

const App = () => {
  return (
    <>
      <Routes>
        {/* i want to show most of the component on the home page so i add all component on DashBoard component  then its route on home component  */}

        <Route path="/" element={<Login />} />

        <Route path="/dasboard/:username" element={<DashBoard />} />
        <Route path="/basket/:id" element={<BasketDetils />} />
        <Route
          path="/popular_basket/:id"
          element={<MpopularBasket_details />}
        />
      </Routes>

      {/* <BasketDetils /> */}

      {/* <Test_Basket /> */}
    </>
  );
};

export default App;
