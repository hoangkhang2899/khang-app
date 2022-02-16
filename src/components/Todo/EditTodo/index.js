import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodo } from "../TodoList/todoListSlice";
import { resetValue, setValue, selectEdit, submitValue } from "./editTodoSlice";

export default function EditTodo() {
  const value = useSelector(selectEdit);
  const list = useSelector(selectTodo);
  const dispatch = useDispatch();
  const myRef = useRef();
  const refReset = useRef();

  useEffect(() => {
    if (value.method === "change") {
      const i = value.index;
      dispatch(
        setValue({
          ...value,
          name: list[i].name,
          status: list[i].status,
          date: list[i].date,
        })
      );
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.index]);

  function closeModal() {
    myRef.current.click();
    const { status } = refReset.current;
    status.value = "true";
    dispatch(resetValue());
  }
  function handleSubmit(e) {
    const { status, date } = value;
    e.preventDefault();
    if (status) {
      if (date) {
        dispatch(submitValue(value));
        closeModal();
      }
    } else {
      dispatch(submitValue(value));
      closeModal();
    }
  }
  function handleChange(e) {
    const { name } = e.target;
    dispatch(
      setValue({
        ...value,
        [name]: name === "status" ? !value.status : e.target.value,
      })
    );
  }

  return (
    <div
      className="modal fade"
      id="editTodo"
      data-keyboard="false"
      data-backdrop="static"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Change Todo</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              ref={myRef}
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} ref={refReset}>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Todo Name"
                  value={value.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="status"
                      value="active"
                      checked={value.status}
                      onChange={handleChange}
                    />
                    Active
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="status"
                      value="deactive"
                      checked={!value.status}
                      onChange={handleChange}
                    />
                    Deactive
                  </label>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  value={value.date}
                  onChange={handleChange}
                  disabled={!value.status}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
