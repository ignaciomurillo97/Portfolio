import React from "react";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import TimeLine from "./Components/TimeLine";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./Components/DetailPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/details/:type/:slug" element={<DetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

const HomePage = () => (
  <div className="page-transition page-transition-home bg-alabaster-gray-800 text-white my-auto">
    <Navbar />
    <Banner />
    <TimeLine
      dataUrl="/experience.json"
      sectionId="experience"
      eyebrow="Experience"
      heading="Where I have made an impact"
      errorMessage="Experience could not be loaded right now."
      detailType="experience"
    />
    <TimeLine
      dataUrl="/education.json"
      sectionId="education"
      eyebrow="Education"
      heading="Where I built my foundation"
      errorMessage="Education could not be loaded right now."
      detailType="education"
    />
    <TimeLine
      dataUrl="/projects.json"
      sectionId="projects"
      eyebrow="Projects"
      heading="Selected work and experiments"
      errorMessage="Projects could not be loaded right now."
      detailType="projects"
    />
    <Footer />
  </div>
);

export default App;
