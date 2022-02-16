import api from "../Utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addBook, selectBookManagement } from "../bookManagementSlice";
import { useState } from "react";
import toVND from "../Utils/toVND";

export default function Books() {
  const [mess, setMess] = useState("");
  const [price, setPrice] = useState(0);
  const { categories } = useSelector(selectBookManagement);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    const { book, category, describe, price } = e.target;
    e.preventDefault();
    if (book.value.trim().length === 0) {
      setMess("Name of book is empty");
    } else if (category.value === "") {
      setMess("Please choose category of book");
    } else if (price.value.trim().length < 4) {
      setMess("Price is too low");
    } else {
      api
        .postWithAuth("admin/addBook", {
          book: book.value,
          category: category.value,
          price: price.value,
          describe: describe.value,
        })
        .then((res) => {
          const { status, bookID } = res.data;
          if (status === "success") {
            dispatch(
              addBook({
                bookID,
                book: book.value,
                category: category.value,
                price: price.value,
                describe: describe.value,
              })
            );
            book.value = "";
            category.value = "";
            price.value = "";
            describe.value = "";
            setPrice(0);
          } else {
            setMess(res.data.errorMessage);
          }
        });
    }
  }
  function handleReset() {
    setPrice(0);
  }
  const showCategories = categories.map((e, i) => (
    <option key={i} value={e.category}>
      {e.category}
    </option>
  ));
  return (
    <>
      <h2 className="text-center mt-3">Add Book</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form-group">
          <label>Book name:</label>
          <input
            type="text"
            className="form-control"
            name="book"
            onChange={() => setMess("")}
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control"
            name="category"
            onChange={() => setMess("")}
          >
            <option value="">Select</option>
            {showCategories}
          </select>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            className="form-control"
            name="price"
            onChange={(e) => {
              setMess("");
              setPrice(e.target.value);
            }}
          />
          {price ? <p className="text-primary ml-2">{toVND(price)}</p> : null}
        </div>
        <div className="form-group">
          <label>Describe:</label>
          <input
            type="text"
            className="form-control"
            name="describe"
            onChange={() => setMess("")}
          />
        </div>
        <div className="form-group text-center">
          {mess ? <p className="text-danger">{mess}</p> : null}
          <button type="submit" className="btn btn-primary mx-1">
            Submit
          </button>
          <button type="reset" className="btn btn-secondary mx-1">
            Reset
          </button>
        </div>
      </form>
    </>
  );
}
