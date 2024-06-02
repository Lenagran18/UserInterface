import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/pages/Profile.js";
import Navbar from "./components/util/Navbar.js";
import Login from "./components/pages/Login.js";
import Register from "./components/pages/Register.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Navbar /> }>
                <Route index element={<Register />}/>
                
                <Route path="profile" element={<Profile />}/>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
