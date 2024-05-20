'use client'
//installa react-router-dom
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "../components/HomePage";
import MenuPage from "../components/MenuPage";
import DrinkPage from "../components/DrinkPage";
import OrderPage from "../components/OrderPage";
import ReceiptPage from "../components/ReceiptPage";

const App:React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/menu" element={<MenuPage />}></Route>
        <Route path="/drink" element={<DrinkPage />}></Route>
        <Route path="/order" element={<OrderPage />}></Route>
        <Route path="/receipt" element={<ReceiptPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;