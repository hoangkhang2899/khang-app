import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { setCategory, setOrder } from "../bookManagementSlice";
import api from "../Utils/api";
import AdminPage from "./AdminPage";
import Books from "./Books";
import Categories from "./Categories";
import Orders from "./Orders";
import SideBar from "./SideBar";

export default function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    const controller1 = new AbortController();
    const category = api.get("categories", { signal: controller1.signal });
    const order = api.getWithAuth("admin/orders");
    api
      .getWithAuth("admin", { signal: controller.signal })
      .then(() => Promise.all([category, order]))
      .then(([resCategory, resOrder]) => {
        dispatch(setCategory(resCategory.data));
        dispatch(setOrder(resOrder.data));
      })
      .catch((err) => {
        console.log(err);
        navigate("/book");
      });
    return () => {
      controller.abort();
      controller1.abort();
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="row mx-0">
        <div className="col-2 px-0">
          <SideBar />
        </div>
        <div className="col-10">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container">
                  <Outlet />
                </div>
              }
            >
              <Route index element={<AdminPage />} />
              <Route path="add-book" element={<Books />} />
              <Route path="add-category" element={<Categories />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}
