import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Components/Main';
import Navbar from './Components/Navbar';
import Forme from './Components/Forme';
import Blogpage from './Components/Blogpage';
import About from './Components/About';
import Contact from './Components/Contact';
import PersonalInfo from './components/PersonalInfo';
import DomainSelection from './components/DomainSelection';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';


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
          <Route path="/" element={<PersonalInfo />} />
          <Route path="/domain-selection" element={<DomainSelection />} />
        </Routes>
      </div>
   </Router>
   );
  };
  
  export default App;
