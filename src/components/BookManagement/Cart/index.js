import { useSelector } from "react-redux";
import { selectCustomer } from "../customerSlice";

export default function Cart() {
  const { cart } = useSelector(selectCustomer);
  const showCart = cart.map((e, i) => (
    <tr key={i}>
      <td>{i+1}</td>
      <td>{e.item}</td>
      <td>{e.amount}</td>
      <td>null</td>
    </tr>
  ));
  return (
    <div className="container">
      <h2 className="text-center">Check your cart</h2>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {showCart}
          </tbody>
        </table>
      </div>
    </div>
  );
}
