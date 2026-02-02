import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageContainer } from "./components/layout/PageContainer";
import { Home } from "./pages/Home";
import { Simulator } from "./pages/Simulator";
import { Portfolio } from "./pages/Portfolio";

function App() {
  return (
    <BrowserRouter>
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </PageContainer>
    </BrowserRouter>
  );
}

export default App;
