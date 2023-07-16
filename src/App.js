import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutApp from "./pages/LayoutApp";
import { ConfigProvider, theme } from "antd";
import FormSample from "./pages/Sample";
import Auth from "./pages/authentication/Auth";

function App() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Auth />;
  }

  return (
    <div>
      <ConfigProvider
        theme={{
          // algorithm: theme.darkAlgorithm,
          algorithm: theme.defaultAlgorithm,
          token: {
            // colorPrimary: '#00b96b'
          },
        }}
      >
        <LayoutApp>
          <Routes>
            <Route path="/" element={<FormSample />} />
            <Route path="/dashboard" element={<FormSample />} />
          </Routes>
        </LayoutApp>
      </ConfigProvider>
    </div>
  );
}

export default App;
