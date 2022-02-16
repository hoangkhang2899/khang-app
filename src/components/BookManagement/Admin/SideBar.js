import { NavLink } from "react-router-dom";
export default function SideBar() {
  return (
    <nav className="nav nav-pills flex-column">
      <NavLink className="nav-link" end to="">
        Dashboard
      </NavLink>
      <NavLink className="nav-link" to="add-book">
        Add Book
      </NavLink>
      <NavLink className="nav-link" to="add-category">
        Add Category
      </NavLink>
      <NavLink className="nav-link" to="orders">
        Orders
      </NavLink>
    </nav>
  );
}
