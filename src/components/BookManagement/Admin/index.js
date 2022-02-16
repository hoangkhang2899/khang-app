import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { setCategory } from "../bookManagementSlice";
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
    api
      .getWithAuth("admin", { signal: controller.signal })
      .catch((err) => {
        console.log(err);
        navigate("/book");
      });
    api.get("categories", { signal: controller1.signal }).then((res) => {
      if (res.status === 200) {
        dispatch(setCategory(res.data));
      }
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
