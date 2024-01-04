import { useEffect, useState } from 'react'
import './App.css'
import { Box, Select } from '@chakra-ui/react'
import { Link, Route , Routes, json, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import FetchData from './components/FetchData';
import Product from './components/Product';
import FetchSearch from './components/FetchSearch';
import FetchByCategory from './components/FetchByCategory';
import Login from './components/Login';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
import Cart from './components/Cart';

function App() {
  const navigate = useNavigate();
  const [category , setCategory] = useState();
  const [cartCount , setCartCount] = useState(0);

  const user = useRecoilValue(userAtom);

  useState(()=>{
    let cart = localStorage.getItem("cart");
    if(cart) {
      cart = JSON.parse(cart)
      setCartCount(cart.items);
    }
    else{
      setCartCount(0);
    }
  },[])


  const handleSelectChange = async(e)=>{
    setCategory(e.target.value);
  }

  return (
    <Box p={5} minHeight={"100vh"} w={"100%"} h={"100%"} bg={"gray.900"} color={"white"}>


      {user && <Navbar cartCount={cartCount} />}
      <Routes>
        <Route path='/' element={ user? <FetchData setCartCount={setCartCount} /> : <Login/> } />
        <Route path='/product/:id' element={user ? <Product/> : <Login/>} />
        <Route path='/:query' element={user ? <FetchSearch setCartCount={setCartCount} /> : <Login/>}/>
        <Route path='/category/:cat' element={user ? <FetchByCategory setCartCount = {setCartCount} /> : <Login/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/cart' element={ user? <Cart setCartCount={setCartCount} /> : <Login/> }  />
      </Routes>
     </Box>
  )
}

export default App
