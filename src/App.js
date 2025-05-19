// App.js
import "./App.css";
import PlyViewerPage from "./page/PlyViewerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/viewer/:plyFileName" element={<PlyViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
