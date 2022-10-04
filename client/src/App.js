import React, { createContext, useReducer } from 'react'
import Navbar from './components/Navbar'
import { Routes , Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Registration from './components/Registration'
import Logout from './components/Logout'
import { initialState , reducer } from '../src/reducer/UseReducer'


// 1. Create Context
export const userContext = createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer , initialState) // dispatch mei kuch bhi change hota hai toh wo reducer mei jaa ke state change kr deta hai
  return (
    <>
    <userContext.Provider value={{state, dispatch}}>
      <Navbar/>
      
      <Routes>
    <Route exact path="/" element={ <Home/> } />
        <Route exact path="/about" element={ <About/> }/>
        <Route exact path="/contact" element={ <Contact/> }/>
        <Route exact path="/login" element={ <Login/> }/>
        <Route exact path="/registration" element={ <Registration/> }/>
        <Route exact path="/logout" element={ <Logout/> }/>

        </Routes> 

        </userContext.Provider>
    </>
  )
}

export default App