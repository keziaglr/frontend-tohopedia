import logo from './logo.svg';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import LoginPage from './pages/user/LoginPage/LoginPage';
import HomePage from './pages/user/HomePage/HomePage';
import RegisterPage from './pages/user/RegisterPage/RegisterPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
