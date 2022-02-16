import { useSelector } from "react-redux";
import { selectBookManagement } from "../bookManagementSlice";
import toVND from "../Utils/toVND";

export default function AdminPage() {
  const { books, categories } = useSelector(selectBookManagement);
  const showBooks = books.map((e, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{e.bookID}</td>
      <td>{e.book}</td>
      <td>{e.category}</td>
      <td>{toVND(e.price)}</td>
      <td>{e.describe?.length > 30 ? `${e.describe.substring(0, 30)}...` : e.describe}</td>
    </tr>
  ));
  const showCategories = categories.map((e, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{e.category}</td>
      <td>{books.filter((ele) => ele.category === e.category).length}</td>
    </tr>
  ));
  return (
    // <div className="row">
    //   <div className="col-6">
    //     <section>{showBooks}</section>
    //   </div>
    //   <div className="col-6">
    //     <section>{showCategories}</section>
    //   </div>
    // </div>
    <>
      <div className="table-responsive">
        <h2 className="text-center">List of categories</h2>
        <table className="table table-bordered">
          <thead className="thead-inverse">
            <tr className="text-center">
              <th>No .</th>
              <th>Name</th>
              <th>Total books</th>
            </tr>
          </thead>
          <tbody>{showCategories}</tbody>
        </table>
      </div>
      <div className="table-responsive">
        <h2 className="text-center">List of books</h2>
        <table className="table table-bordered">
          <thead className="thead-inverse">
            <tr className="text-center">
              <th>No .</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discribe</th>
            </tr>
          </thead>
          <tbody>{showBooks}</tbody>
        </table>
      </div>
    </>
  );
}
