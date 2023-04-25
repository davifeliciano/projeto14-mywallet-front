export default function parseAmount(amount) {
  return parseFloat(
    amount.replace("R$ ", "").replace(".", "").replace(",", ".")
  );
}
