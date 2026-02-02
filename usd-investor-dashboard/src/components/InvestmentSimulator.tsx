import { useMemo, useState } from "react";
import { buildProjection, futureValue } from "../utils/calculations";
import { formatCurrency } from "../utils/formatCurrency";

export function InvestmentSimulator() {
  const [targetUSD, setTargetUSD] = useState<number>(10000);
  const [months, setMonths] = useState<number>(12);
  const [monthlyUSD, setMonthlyUSD] = useState<number>(300);
  const [annualRatePercent, setAnnualRatePercent] = useState<number>(8);
  const [initialUSD, setInitialUSD] = useState<number>(0);

  const projectedTotal = useMemo(() => {
    return futureValue({
      initial: initialUSD,
      monthly: monthlyUSD,
      months,
      annualRatePercent,
    });
  }, [initialUSD, monthlyUSD, months, annualRatePercent]);

  const timeToGoalText = useMemo(() => {
    if (projectedTotal >= targetUSD) return `${months} months`;
    return "Not reached";
  }, [projectedTotal, targetUSD, months]);

  const projection = useMemo(() => {
    const rows = buildProjection({
      initial: initialUSD,
      monthly: monthlyUSD,
      months,
      annualRatePercent,
    });

    // mostra só os últimos 6 meses na Home (fica clean)
    return rows.slice(Math.max(0, rows.length - 6));
  }, [initialUSD, monthlyUSD, months, annualRatePercent]);

  return (
    <div>
      <div style={{ display: "grid", gap: 10 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ opacity: 0.8 }}>Target amount (USD)</span>
          <input
            type="number"
            value={targetUSD}
            min={0}
            onChange={(e) => setTargetUSD(Number(e.target.value))}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ opacity: 0.8 }}>Time frame (months)</span>
          <input
            type="number"
            value={months}
            min={1}
            onChange={(e) => setMonths(Number(e.target.value))}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ opacity: 0.8 }}>Monthly contribution (USD)</span>
          <input
            type="number"
            value={monthlyUSD}
            min={0}
            onChange={(e) => setMonthlyUSD(Number(e.target.value))}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ opacity: 0.8 }}>Expected return (% p.a.)</span>
          <input
            type="number"
            value={annualRatePercent}
            min={0}
            step={0.1}
            onChange={(e) => setAnnualRatePercent(Number(e.target.value))}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ opacity: 0.8 }}>Initial amount (USD)</span>
          <input
            type="number"
            value={initialUSD}
            min={0}
            onChange={(e) => setInitialUSD(Number(e.target.value))}
            style={inputStyle}
          />
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginTop: 14,
          paddingTop: 14,
          borderTop: "1px solid #1b2a44",
        }}
      >
        <div>
          <div style={{ opacity: 0.75 }}>Projected total</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            {formatCurrency(projectedTotal, "USD")}
          </div>
        </div>

        <div>
          <div style={{ opacity: 0.75 }}>Time to goal</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{timeToGoalText}</div>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <strong>Last months projection</strong>
        <ul style={{ paddingLeft: 18, margin: "8px 0 0" }}>
          {projection.map((row) => (
            <li key={row.month} style={{ marginBottom: 6, opacity: 0.9 }}>
              Month {row.month}: {formatCurrency(row.total, "USD")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #1b2a44",
  background: "#0b1220",
  color: "#e6eaf2",
};
