import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.scss';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import MovieDetail from './components/MovieDetail/MovieDetail';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route exact path="/movie/:imdbID" element={ <MovieDetail /> } />
            <Route element={ <PageNotFound /> } />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;