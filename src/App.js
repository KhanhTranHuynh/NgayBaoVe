// App.js
import "./App.css";
import PlyViewerPage from "./page/PlyViewerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:plyFileName" element={<PlyViewerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
