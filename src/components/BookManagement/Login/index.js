import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../bookManagementSlice";
import api from "../Utils/api";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    const { username, password } = e.target;
    const obj = {
      username: username.value,
      password: password.value,
    };
    e.preventDefault();
    api
      .post("login", obj)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(
          setLogin({
            isLogin: true,
            username: res.data.username,
            role: res.data.role,
          })
        );
        navigate("/book");
      })
      .catch((err) => console.error(err));
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" name="username" />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
