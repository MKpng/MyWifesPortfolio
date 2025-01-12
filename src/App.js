"use client";

import React, { useEffect, useState } from "react";

import Hero from "./Hero";
import Mobile from "./Mobile";

const ResponsiveHome = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth <= 768 ? <Mobile /> : <Hero />;
};

function App() {

  return (
    <ResponsiveHome />
  );
}

export default App;
