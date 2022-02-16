import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectBookManagement } from "../bookManagementSlice";
import { addItem } from "../customerSlice";
import toVND from "../Utils/toVND";

export default function Home() {
  const dispatch = useDispatch();
  const { books } = useSelector(selectBookManagement);
  const showBooks = books.map((e, i) => (
    <div key={i} className="col mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title text-center">{e.book}</h5>
          <p className="card-text">Price: {toVND(e.price)}</p>
          <p className="card-text">Book ID: {e.bookID}</p>
          <p className="card-text">Category: {e.category}</p>
          <p className="card-text">Describe: {e.describe}</p>
        </div>
        <div className="card-footer text-center">
          {/* <button type="button" className="btn btn-sm btn-primary mx-1">
            Buy now
          </button> */}
          <Link
            to="cart"
            className="btn btn-sm btn-primary mx-1"
            onClick={() => {
              dispatch(addItem({ item: e.book, amount: 1 }));
            }}
          >
            Buy Now
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-secondary mx-1"
            onClick={() => {
              dispatch(addItem({ item: e.book, amount: 1 }));
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-md-3">{showBooks}</div>
    </div>
  );
}
