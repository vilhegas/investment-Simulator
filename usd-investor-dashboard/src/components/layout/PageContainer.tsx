import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

type Props = { children: ReactNode };

export function PageContainer({ children }: Props) {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "20px", maxWidth: 1100, margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}
