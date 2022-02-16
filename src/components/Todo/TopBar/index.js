import { useSelector, useDispatch } from "react-redux";
import { setSearch, selectSearch, resetSearch } from "./topBarSlice";
import EditTodo from "../EditTodo";
import { setMethod } from "../EditTodo/editTodoSlice";

export default function TopBar() {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();
  return (
    <>
      <header className="header fixed-top">
        <div className="d-flex justify-content-center">
          <div className="input-group search">
            <input
              type="text"
              className="form-control"
              name="search"
              placeholder="Search something by name"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              onFocus={(e) => e.target.select()}
            />
            {search ? (
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => dispatch(resetSearch())}
                >
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                </button>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            className="btn btn-primary text-nowrap mx-2"
            data-toggle="modal"
            data-target="#editTodo"
            onClick={() => dispatch(setMethod("add"))}
          >
            Add Todo
          </button>
        </div>
      </header>
      <EditTodo />
    </>
  );
}
