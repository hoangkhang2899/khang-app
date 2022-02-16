import Todo from "./components/Todo";
import NoMatch from "./components/NoMatch";
import Homepage from "./components/Homepage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import BookManagement from "./components/BookManagement"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="book/*" element={<BookManagement />} />
        <Route path="todo" element={<Todo />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
