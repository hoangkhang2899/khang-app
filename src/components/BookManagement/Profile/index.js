import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBookManagement, setOrderHistory } from "../bookManagementSlice";
import { useNavigate } from "react-router-dom";
import api from "../Utils/api";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, username, role, orderHistory } = useSelector(selectBookManagement);
  useEffect(() => {
    if (isLogin) {
      api.getWithAuth("user/orderHistory").then((res) => {
        const { status, orders } = res.data;
        console.log(orders);
        if (status === "success") {
          dispatch(setOrderHistory(orders));
        }
      });
    } else {
      navigate("/book");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const showOrderHistory = orderHistory.map((e, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{e.orderID}</td>
      <td>{e.item.map((e1) => `${e1.item}-${e1.amount}`)}</td>
      <td>{e.status}</td>
      <td>
        <button type="button" className="btn btn-sm btn-primary">
          Cancel order
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <p>Username: {username}</p>
          <p>Role: {role}</p>
        </div>
        <div className="col-9">
          <h2 className="text-center">Your orders history</h2>
          <div className="table-responsive">
            <h2 className="text-center">List of orders</h2>
            <table className="table table-borderless">
              <thead>
                <tr className="text-center">
                  <th>No .</th>
                  <th>Order ID</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{showOrderHistory}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
