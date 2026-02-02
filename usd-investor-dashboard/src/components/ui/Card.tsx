import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function Card({ title, children }: Props) {
  return (
    <section
      style={{
        border: "1px solid #1b2a44",
        borderRadius: 14,
        padding: 16,
        background: "#0f1b31",
      }}
    >
      <h2 style={{ margin: "0 0 12px" }}>{title}</h2>
      {children}
    </section>
  );
}
