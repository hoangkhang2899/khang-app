import api from "../Utils/api";

export default function Register() {
  function handleSubmit(e) {
    const { username, password, role } = e.target;
    e.preventDefault();
    if (username.value && password.value && role.value) {
      const obj = {
        username: username.value,
        password: password.value,
        role: role.value,
      };
      api
        .post("register", obj)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
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
        <div className="form-group">
          <select className="form-control" name="role">
            <option value="">Choose</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
