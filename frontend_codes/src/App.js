import './App.css';
import Post from './pages/PostCard'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';

function App() {
  return (

    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/post-cart' element={<Post />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
