import { Box } from '@chakra-ui/react'
import React from 'react'
import NavBar from './components/NavBar'
import FetchProducts from './components/FetchProducts'
import { Route, Routes } from 'react-router-dom'

function UserHeader() {
  return (
    <Box>
       <NavBar/>
    </Box>
  )
}

export default UserHeader
