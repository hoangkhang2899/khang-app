import { useSelector, useDispatch } from "react-redux";
import { deleteOrder, selectBookManagement } from "../bookManagementSlice";

import api from "../Utils/api";

export default function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector(selectBookManagement);
  const controller = new AbortController();
  function handleCancelButton(orderID, i) {
    api
      .deleteWithAuth("admin/cancelOrder", { orderID }, { signal: controller.signal })
      .then((res) => {
        if (res.data.status === "success") {
          dispatch(deleteOrder(i));
        }
      });
  }
  const showOrders = orders.map((e, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{e.orderID}</td>
      <td>{e.username}</td>
      <td>
        {e.item.map((ce, ci) => {
          return ci === e.item.length - 1 ? `${ce.id} - ${ce.amount}` : `${ce.id} - ${ce.amount}, `;
        })}
      </td>
      <td>{e.status}</td>
      <td>
        {e.status === "canceling" ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleCancelButton(e.orderID, i)}
          >
            Cancel
          </button>
        ) : null}
      </td>
    </tr>
  ));
  return (
    <div className="table-responsive">
      <h2 className="text-center">List of orders</h2>
      <table className="table table-borderless">
        <thead>
          <tr className="text-center">
            <th>No .</th>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Item</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showOrders}</tbody>
      </table>
    </div>
  );
}
