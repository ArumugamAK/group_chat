
import './App.css';
// import React,{useEffect,useState} from 'react';
import Sidebar from './Sidebar'
import Chat from './Chat'
import Login from './login';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import { useState } from 'react';
function App() {
  const[user,setUser]=useState(sessionStorage.getItem('user','') ? 
  JSON.parse(sessionStorage.getItem('user',''))
  : ''
  );

  return !user?(<Login setuser={setUser}/>):(
          <div className="app">
            <div className='app_body'>
              {/* <h1></h1> */}
            <BrowserRouter>
              <Sidebar setUser={setUser} user={user}/>
            <Routes>
              <Route path='/rooms/:roomId' element={<Chat user={user}/>}/>
              <Route path='/' element={<Chat user={user}/>}/>
            </Routes>
            </BrowserRouter>
            </div>

          </div>
      );
}

export default App;
