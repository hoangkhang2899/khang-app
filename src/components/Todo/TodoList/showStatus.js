export default function showStatus(text) {
  const status = text === "Active" ? true : false;
  return (
    <td
      className={
        status ? "text-center text-success" : "text-center text-danger"
      }
    >
      {text}
    </td>
  );
}