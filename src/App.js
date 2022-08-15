import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
        <Router>
          <div className="d-flex">
            <div className="container bg-dark m-auto px-5 py-5 rounded-3 text-white">
                  <Routes>
                    <Route path="/create" element={< Create />}/>
                    <Route path="/edit/:id" element={< Edit />}/>
                    <Route path="/search" element={< Search />}/>
                    <Route path="/detail/:id" element={< Detail />}/>
                    <Route path="/" element={< Home />} />
                  </Routes>
              </div>  
            </div>
        </Router>
    </div>
  );
}

export default App;
