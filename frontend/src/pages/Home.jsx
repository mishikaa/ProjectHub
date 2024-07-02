import React from 'react'

import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Home/Footer';
// import Header from '../components/Home/Header';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import '../components/Home/home.css'

const Home = () => {
  return (
    <div>
        <Navbar />  
        <Hero />
        <Features />
        <Footer />
    </div>
  )
}

export default Home;