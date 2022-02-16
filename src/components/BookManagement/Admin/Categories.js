import api from "../Utils/api";

export default function Categories() {
  function handleSubmit(e) {
    const { category } = e.target;
    e.preventDefault();
    if (category.value.trim().length !== 0) {
      api
        .postWithAuth("admin/addCategory", { category: category.value })
        .then(() => {
          category.value = "";
        });
    }
  }
  return (
    <>
      <h2 className="text-center">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category name:</label>
          <input type="text" className="form-control" name="category" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
