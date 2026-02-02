import { formatCurrency } from "../utils/formatCurrency";

const assets = [
  { symbol: "AAPL", name: "Apple Inc.", value: 7200, change: 2.5 },
  { symbol: "IVV", name: "S&P 500 ETF", value: 8900, change: 1.8 },
  { symbol: "TSLA", name: "Tesla Inc.", value: 5650, change: -1.2 },
];

export function PortfolioOverview() {
  const total = assets.reduce((acc, a) => acc + a.value, 0);

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ opacity: 0.75 }}>Total value</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>
          {formatCurrency(total, "USD")}
        </div>
      </div>

      <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
        {assets.map((asset) => (
          <li
            key={asset.symbol}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              paddingBottom: 10,
              borderBottom: "1px solid #1b2a44",
            }}
          >
            <div>
              <strong>{asset.symbol}</strong>
              <div style={{ opacity: 0.7, fontSize: 13 }}>
                {asset.name}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div>{formatCurrency(asset.value, "USD")}</div>
              <div
                style={{
                  fontSize: 13,
                  color: asset.change >= 0 ? "#4ade80" : "#f87171",
                }}
              >
                {asset.change >= 0 ? "+" : ""}
                {asset.change}%
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
