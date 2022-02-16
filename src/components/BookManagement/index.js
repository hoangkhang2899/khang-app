import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin, setBook } from "./bookManagementSlice";
import { Routes, Route } from "react-router-dom";
import api from "./Utils/api";
import Home from "./Home";
import Header from "./Layout/Header";
import Login from "./Login";
import Register from "./Register";
import Admin from "./Admin";
import NoMatch from "../NoMatch";
import Cart from "./Cart";

export default function BookManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      api.getWithAuth("authorization").then((res) => {
        dispatch(
          setLogin({
            isLogin: true,
            username: res.data.username,
            role: res.data.role,
          })
        );
      });
    }
    api.get("books").then((res) => {
      if (res.status === 200) {
        dispatch(setBook(res.data));
      }
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin/*" element={<Admin />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
