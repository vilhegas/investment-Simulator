import { CurrencyConverter } from "../components/CurrencyConverter";
import { InvestmentSimulator } from "../components/InvestmentSimulator";
import { Card } from "../components/ui/Card";
import { PortfolioOverview } from "../components/PortfolioOverview";


export function Home() {
  return (
    <section>
      <h1 style={{ margin: "0 0 16px" }}>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 16,
        }}
      >
        {/* Currency Converter */}
        <div style={{ gridColumn: "span 4" }}>
          <Card title="Currency Converter">
            <CurrencyConverter />
          </Card>
        </div>

        {/* Simulator */}
        <div style={{ gridColumn: "span 4" }}>
          <Card title="Investment Simulator">
            <InvestmentSimulator />
          </Card>
        </div>

        {/* Portfolio */}
        <div style={{ gridColumn: "span 4" }}>
          <Card title="Portfolio Overview">
            <PortfolioOverview />
          </Card>
        </div>
      </div>
    </section>
  );
}
