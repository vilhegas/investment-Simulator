export type ProjectionRow = {
  month: number;
  total: number;
};

export function futureValue({
  initial,
  monthly,
  months,
  annualRatePercent,
}: {
  initial: number;
  monthly: number;
  months: number;
  annualRatePercent: number;
}) {
  const r = (annualRatePercent / 100) / 12; // taxa mensal
  let total = initial;

  for (let i = 1; i <= months; i++) {
    total = total * (1 + r) + monthly;
  }

  return total;
}

export function buildProjection({
  initial,
  monthly,
  months,
  annualRatePercent,
}: {
  initial: number;
  monthly: number;
  months: number;
  annualRatePercent: number;
}) {
  const r = (annualRatePercent / 100) / 12;
  let total = initial;

  const rows: ProjectionRow[] = [];
  for (let i = 1; i <= months; i++) {
    total = total * (1 + r) + monthly;
    rows.push({ month: i, total });
  }

  return rows;
}
