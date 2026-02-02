export async function fetchUSDBRLRate(): Promise<number> {
  // API pública simples (AwesomeAPI)
  const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
  if (!res.ok) throw new Error("Failed to fetch exchange rate");

  const data = await res.json();
  const bid = Number(data?.USDBRL?.bid);

  if (!Number.isFinite(bid)) throw new Error("Invalid exchange rate");

  return bid; // Ex: 5.12
}
