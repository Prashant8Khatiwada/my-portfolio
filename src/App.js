import React from "react";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
// import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <About />
      <Experience />
    </>
  );
}

export default App;
