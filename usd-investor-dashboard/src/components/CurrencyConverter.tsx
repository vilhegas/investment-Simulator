import { useEffect, useMemo, useState } from "react";
import { fetchUSDBRLRate } from "../services/exchangeRateService";
import { formatCurrency } from "../utils/formatCurrency";
import { useLocalStorage } from "../hooks/useLocalStorage";

type HistoryItem = {
  brl: number;
  usd: number;
  rate: number;
  at: string; // ISO date
};

export function CurrencyConverter() {
  const [rate, setRate] = useState<number | null>(null);
  const [loadingRate, setLoadingRate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [brlInput, setBrlInput] = useState<string>("1500");
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    "usd-investor:conversionHistory",
    []
  );

  useEffect(() => {
    (async () => {
      try {
        setLoadingRate(true);
        setError(null);
        const r = await fetchUSDBRLRate();
        setRate(r);
      } catch (e) {
        setError("Não foi possível buscar a cotação. Tente novamente.");
        setRate(null);
      } finally {
        setLoadingRate(false);
      }
    })();
  }, []);

  const brlValue = useMemo(() => {
    // aceita "1500", "1.500", "1.500,50"
    const normalized = brlInput.replace(/\./g, "").replace(",", ".");
    const n = Number(normalized);
    return Number.isFinite(n) ? n : 0;
  }, [brlInput]);

  const usdValue = useMemo(() => {
    if (!rate) return 0;
    return brlValue / rate;
  }, [brlValue, rate]);

  function handleConvert() {
    if (!rate) return;

    const item: HistoryItem = {
      brl: brlValue,
      usd: usdValue,
      rate,
      at: new Date().toISOString(),
    };

    setHistory([item, ...history].slice(0, 6)); // guarda só 6 últimas
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <section
      style={{
        border: "1px solid #1b2a44",
        borderRadius: 12,
        padding: 16,
        background: "#0f1b31",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Currency Converter</h2>

      <p style={{ marginTop: 0, opacity: 0.85 }}>
        Cotação USD/BRL:{" "}
        {loadingRate ? "carregando..." : rate ? rate.toFixed(4) : "—"}
      </p>

      {error && (
        <p style={{ marginTop: 0, color: "#ffb4b4" }}>
          {error}{" "}
          <button
            onClick={() => window.location.reload()}
            style={{ marginLeft: 8 }}
          >
            Recarregar
          </button>
        </p>
      )}

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={brlInput}
          onChange={(e) => setBrlInput(e.target.value)}
          placeholder="Valor em BRL"
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #1b2a44",
            background: "#0b1220",
            color: "#e6eaf2",
          }}
        />
        <button
          onClick={handleConvert}
          disabled={!rate || loadingRate}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #1b2a44",
            background: !rate ? "#23324d" : "#2b69ff",
            color: "white",
            cursor: !rate ? "not-allowed" : "pointer",
          }}
        >
          Convert
        </button>
      </div>

      <p style={{ marginBottom: 0, marginTop: 12, opacity: 0.9 }}>
        Resultado:{" "}
        <strong>
          {formatCurrency(brlValue, "BRL")} → {formatCurrency(usdValue, "USD")}
        </strong>
      </p>

      <div style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>History</strong>
          {history.length > 0 && (
            <button onClick={clearHistory}>Clear</button>
          )}
        </div>

        {history.length === 0 ? (
          <p style={{ opacity: 0.7 }}>Sem conversões ainda.</p>
        ) : (
          <ul style={{ paddingLeft: 18, margin: "8px 0 0" }}>
            {history.map((h) => (
              <li key={h.at} style={{ marginBottom: 6 }}>
                {formatCurrency(h.brl, "BRL")} → {formatCurrency(h.usd, "USD")}{" "}
                <span style={{ opacity: 0.7 }}>
                  (rate {h.rate.toFixed(4)})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
