import { useSelector } from "react-redux";
import TodoList from "./TodoList";
import TopBar from "./TopBar";
import { selectSearch } from "./TopBar/topBarSlice";

export default function Todo() {
  const search = useSelector(selectSearch);
  return (
    <>
      <TopBar />
      <div style={{ marginBottom: "3.375rem" }} />
      <TodoList search={search}/>
    </>
  );
}