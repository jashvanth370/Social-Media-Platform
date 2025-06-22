import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import FeedPage from './pages/FeedPage';
import UserProfile from './pages/UserProfilePage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/post-card' element={<PostCard />} />
          <Route path='/feed-page' element={<FeedPage />} />
          <Route path='/profile/:id' element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
