"use client";
//installa react-router-dom
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./HomePage";
import MenuPage from "./MenuPage";
import DrinkPage from "./DrinkPage";
import OrderPage from "./OrderPage";
import ReceiptPage from "./ReceiptPage";

export default function Home() {
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
  );
}