import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import GymsPage from "./pages/Gyms/GymsPage";
import ShoesPage from "./pages/Shoes/ShoesPage";
import ShoesDetailPage from "./pages/Shoes/shoesDetailPage";
import NewsPage from "./pages/News/NewsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gyms" element={<GymsPage />} />
        <Route path="/shoes" element={<ShoesPage />} />
        <Route path="/shoes/:id" element={<ShoesDetailPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
