import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Coin from './pages/Coin';
import Search from './pages/Search';
import Footer from './pages/Footer';


function App() {
  return (
    <Router>
    <div className='App'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/:id' element={<Coin />} />
    </Routes>
    <Footer />
    </div>
    </Router>
  );
}

export default App;
