import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import TimeLine from './Components/TimeLine';
import Footer from './Components/Footer';
function App() {
  return (
    <div className="bg-alabaster-gray-800 text-white my-auto">
      <Navbar/>
      <Banner />
      <TimeLine
        dataUrl="/experience.json"
        sectionId="experience"
        eyebrow="Experience"
        heading="Where I have made an impact"
        errorMessage="Experience could not be loaded right now."
      />
      <TimeLine
        dataUrl="/education.json"
        sectionId="education"
        eyebrow="Education"
        heading="Where I built my foundation"
        errorMessage="Education could not be loaded right now."
      />
      <Footer />
    </div>
  );
}

export default App;