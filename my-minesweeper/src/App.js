import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MineSweeper from './components/Minesweeper';
 import Homepage from './components/Homepage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/play' element={<MineSweeper/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
