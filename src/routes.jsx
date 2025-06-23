import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Demo from "./pages/Demo.jsx";
import Single from "./pages/Single.jsx";
import Layout from "./pages/Layout.jsx";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people/:uid" element={<Single />} />
        <Route path="/planets/:uid" element={<Single />} />
        <Route path="/vehicles/:uid" element={<Single />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Layout>
  );
};

export default App;
