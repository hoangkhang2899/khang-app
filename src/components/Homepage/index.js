import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="row">
      <div className="col text-center mt-5">
        <Link className="btn btn-primary m-2" to="todo">
          View Todo App
        </Link>
      </div>
      <div className="col text-center mt-5">
        <Link className="btn btn-primary m-2" to="book">
          View Book Management
        </Link>
      </div>
    </div>
  );
}
