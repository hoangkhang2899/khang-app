import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearItem, selectCustomer, increaseItem, decreaseItem } from "../customerSlice";
import api from "../Utils/api";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCustomer);
  const showCart = cart.map((e, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{e.id}</td>
      <td>{e.item}</td>
      <td>{e.amount}</td>
      <td>
        <button type="button" className="btn btn-sm btn-primary mx-1" onClick={() => dispatch(increaseItem(i))}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
        <button type="button" className="btn btn-sm btn-primary mx-1" onClick={() => dispatch(decreaseItem(i))}>
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>
      </td>
      <td>
        <button type="button" className="btn btn-sm btn-primary" onClick={() => dispatch(removeItem(i))}>
          Remove
        </button>
      </td>
    </tr>
  ));
  function handleButton() {
    if (cart.length > 0) {
      api.postWithAuth("order", { cart }).then((res) => {
        if (res.data.status === "success") {
          dispatch(clearItem());
        } else {
          alert(res.data.errorMessage);
        }
      });
    } else {
      alert("Your cart is empty!");
    }
  }
  return (
    <div className="container">
      <h2 className="text-center">Check your cart</h2>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>#</th>
              <th>Product ID</th>
              <th>Item</th>
              <th>Amount</th>
              <th>Action</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{showCart}</tbody>
        </table>
        <button type="button" className="btn btn-primary" onClick={handleButton}>
          Submit
        </button>
      </div>
    </div>
  );
}
