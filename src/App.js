import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutApp from "./pages/LayoutApp";
import { ConfigProvider, theme } from "antd";
import Auth from "./pages/authentication/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FF6347",
          },
        }}
      >
        <Auth />
      </ConfigProvider>
    </>;
    return <Auth />;
  }

  return (
    <div>
      <ConfigProvider
        // theme={{
        //   algorithm: theme.darkAlgorithm,
        //   // algorithm: theme.defaultAlgorithm,
        //   token: {
        //     colorPrimary: "#00b96b",
        //   },
        // }}
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: "#FF6347",
          },
        }}
      >
        <LayoutApp>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </LayoutApp>
      </ConfigProvider>
    </div>
  );
}

export default App;
