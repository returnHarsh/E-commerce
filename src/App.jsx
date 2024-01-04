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

  const user = useRecoilValue(userAtom);


  const handleSelectChange = async(e)=>{
    setCategory(e.target.value);
  }

  return (
    <Box p={5} minHeight={"100vh"} w={"100%"} h={"100%"} bg={"gray.900"} color={"white"}>


      {user && <Navbar/>}
      <Routes>
        <Route path='/' element={ user? <FetchData/> : <Login/> } />
        <Route path='/product/:id' element={user ? <Product/> : <Login/>} />
        <Route path='/:query' element={user ? <FetchSearch/> : <Login/>}/>
        <Route path='/category/:cat' element={user ? <FetchByCategory/> : <Login/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/cart' element={ user? <Cart/> : <Login/> }  />
      </Routes>
     </Box>
  )
}

export default App
