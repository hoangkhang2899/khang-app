export default function toVND(number) {
  const formatter = new Intl.NumberFormat("vi-IN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(number);
}