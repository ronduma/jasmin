import './App.css';

import Home from './components/homepage/Home';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
