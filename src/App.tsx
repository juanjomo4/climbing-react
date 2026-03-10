import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home/HomePage";
import GymsPage from "./pages/Gyms/GymsPage";
import ShoesPage from "./pages/Shoes/ShoesPage";
import ShoesDetailPage from "./pages/Shoes/shoesDetailPage";
import NewsPage from "./pages/News/NewsPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gyms" element={<GymsPage />} />
          <Route path="/shoes" element={<ShoesPage />} />
          <Route path="/shoes/:id" element={<ShoesDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;