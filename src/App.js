import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar'
import { Home } from './Components/Home'
import { About } from './Components/About'
import NoteState from './contexts/notes/NoteState'
import Alert from "./Components/Alert";
import AlertState from "./contexts/alert/AlertState";
import Login from "./Components/Login";
import Register from "./Components/Register";


function App() {

  return (
    <>
      <AlertState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
              </Routes>
            </div>
          </Router>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
