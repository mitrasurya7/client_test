import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LayoutPage from "./pages/Layout";
import AuthGuard from "./components/AuthGuard";
import MyPdfViewer from "./pages/MyPdfViewer";

const App = () => {
  return (
    <section className="App">
      <LayoutPage>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <AuthGuard>
                  <HomePage />
                </AuthGuard>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/read" element={<MyPdfViewer />} />
          </Routes>
        </Router>
      </LayoutPage>
    </section>
  );
};

export default App;
