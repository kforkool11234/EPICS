import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Components/Main';
import Navbar from './Components/Navbar';
import Forme from './Components/Forme';
import Blogpage from './Components/Blogpage';
import About from './Components/About';
import Contact from './Components/Contact';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
        <Route path="/" element={  <div>
                <Main />
                <Forme />
                <Blogpage />
                <About />
                <Contact />
              </div>} />
       
          <Route path="/form" element={<Forme />} /> {/* Form page */}
          <Route path="/blog" element={<Blogpage />} /> {/* Blog page */}
          <Route path="/about" element={<About />} /> {/* About page */}
          <Route path="/contact" element={<Contact />} /> {/* Contact page */}
        </Routes>
      </div>
   </Router>
   );
  };
  
  export default App;
