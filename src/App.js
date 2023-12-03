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


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert type="Sucess" message="Prototype alert message show" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
