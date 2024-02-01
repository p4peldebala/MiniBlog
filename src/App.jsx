import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { onAuthStateChanged } from 'firebase/auth'; // Checks whether user authentication was successful

// Hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAutentication';

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About.jsx'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login  from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost'
import DashBoard from './pages/DashBoard/Dashboard'
import Search from './pages/Search/Search.jsx';
import Post from './pages/Post/Post.jsx';


// Context
import { AuthProvider } from './context/AuthContext';
import EditPost from './pages/EditPost/EditPost.jsx';


// Components
function App() {
  // Monitoring the each user
  const [user,setUser] = useState(undefined)
  const {auth} = useAuthentication()
  const loadingUser = user === undefined
 
  
  useEffect(()=>{
    // Receives user from firebase through onAuthStateChanged and set "user" for specific user, so that loading page for each user in our data bank
    onAuthStateChanged(auth, (user) =>{
      setUser(user)
    })
  }, [auth])

  
  if(loadingUser){
    return <p>Loading...</p>
  }

  
  return (
    <>
      {/* Envolving the context in our app */}
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <NavBar></NavBar>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home></Home>}/>
              <Route path='/about' element={<About></About>}/>
              <Route path='/search' element={<Search></Search>}/>
              {/* Checks if user is logged => Makes with what try access login page via url is not possible or similiar*/}
              <Route path='/login' element={!user ? <Login></Login> : <Navigate to={'/'}></Navigate>}/>
              <Route path='/register' element={!user ? <Register/> : <Navigate to={'/'}></Navigate>}/>
              <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to={'/login'}></Navigate>}/>
              <Route path='/dashboard' element={ user ? <DashBoard/> : <Navigate to={'/login'}></Navigate> }/>

              {/* Dynamic Link */}
              <Route path='/posts/:id' element={ <Post></Post> }/>
              <Route path='/posts/edit/:id' element={user ? <EditPost/> : <Navigate to={'/login'}></Navigate>}/>
              
              
            
            </Routes>
          </div>
          <Footer></Footer>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
