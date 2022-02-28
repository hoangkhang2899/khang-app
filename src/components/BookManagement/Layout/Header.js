import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectBookManagement, setLogin } from "../bookManagementSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { isLogin, username, role } = useSelector(selectBookManagement);
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <NavLink to="" className="navbar-brand">
        BookManagement
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink end to="" className="nav-link">
              Home
            </NavLink>
          </li>
          {role === "admin" ? (
            <li className="nav-item">
              <NavLink to="admin" className="nav-link">
                Admin
              </NavLink>
            </li>
          ) : role === "user" ? (
            <>
              <li className="nav-item">
                <NavLink to="cart" className="nav-link">
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="user" className="nav-link">
                  Profile
                </NavLink>
              </li>
            </>
          ) : null}
          {isLogin ? (
            <li className="nav-item">
              <button
                className="btn nav-link"
                style={{ border: "none" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(setLogin(false));
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="register" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="login" className="nav-link">
                  Login
                </NavLink>
              </li>
            </>
          )}

          {/* <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li> */}
        </ul>
        {isLogin ? (
          <span style={{ color: "rgba(0,0,0,.5)" }}>
            Hi, {username} ({role})
          </span>
        ) : null}
      </div>
    </nav>
  );
}
