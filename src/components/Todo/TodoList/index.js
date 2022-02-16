import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodo,
  removeTodo,
  selectTodo,
  moveUpTodo,
  moveDownTodo,
} from "./todoListSlice";
import showStatus from "./showStatus";
import { setMethod } from "../EditTodo/editTodoSlice";

export default function TodoList({ search }) {
  const list = useSelector(selectTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodo(JSON.parse(localStorage.getItem("list")) || []));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  function exportTodo(element, index) {
    return (
      <tr key={index}>
        <td className="text-center">{index + 1}</td>
        <td>{element.name}</td>
        {element.status ? showStatus("Active") : showStatus("Deactive")}
        {element.status ? (
          <td className="text-center">
            {new Date(element.date).toLocaleString("vi")}
          </td>
        ) : (
          <td />
        )}
        <td className="text-center">
          <button
            type="button"
            className="btn btn-sm btn-warning m-1"
            data-toggle="modal"
            data-target="#editTodo"
            onClick={() =>
              dispatch(setMethod({ name: "change", index: index }))
            }
          >
            Change
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary m-1"
            onClick={() => dispatch(removeTodo(index))}
          >
            Remove
          </button>
        </td>
        <td className="text-center">
          <span
            className="btn btn-sm btn-primary m-1"
            onClick={(e) => {
              dispatch(moveUpTodo(index));
              e.target.blur();
            }}
          >
            <i className="fas fa-caret-up" />
          </span>
          <span
            className="btn btn-sm btn-primary m-1"
            onClick={(e) => {
              dispatch(moveDownTodo(index));
              e.target.blur();
            }}
          >
            <i className="fas fa-caret-down" />
          </span>
        </td>
      </tr>
    );
  }
  const renderList = !search
    ? list.map((element, index) => {
        return exportTodo(element, index);
      })
    : list.map((element, index) => {
        if (element.name.match(new RegExp(search, "i"))) {
          return exportTodo(element, index);
        }
        return null;
      });
  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-inverse">
            <tr className="text-center">
              <th style={{ width: "7%" }}>ID</th>
              <th>Name</th>
              <th style={{ width: "13%" }}>Status</th>
              <th style={{ width: "15%" }}>Deadline</th>
              <th style={{ width: "17%" }}>Action</th>
              <th style={{ width: "10%" }}>Move</th>
            </tr>
          </thead>
          <tbody>{renderList}</tbody>
        </table>
      </div>
    </div>
  );
}
