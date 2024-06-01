import './App.css';
import About from "./components/pages/About.js";
import Navbar from "./components/util/Navbar.js";
import Login from "./components/pages/Login.js";
import Register from "./components/pages/Register.js";

function App() {
  return (
    <div className="App">
        <Register />
        <Login />
        <Navbar />
        <About />
      Hello World
    </div>
  );
}

export default App;
