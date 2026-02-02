export function formatCurrency(value: number, currency: "BRL" | "USD") {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(value);
}
