import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import TimeLine from './Components/TimeLine';
function App() {
  return (
    <div className="bg-alabaster-gray-800 text-white my-auto">
      <Navbar/>
      <Banner />
      <TimeLine />
    </div>
  );
}

export default App;