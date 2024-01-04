import { Flex  } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChakraProvider,Container, VStack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';

function Login() {

    const [formData , setFormData] = useState({
        username : "",
        password : "",
    })

    const [loggedInUser , setLoggedInUser] = useRecoilState(userAtom)



    const loginHandler = async()=>{
        try{
            const res = await axios({
                method : "post",
                url : "https://dummyjson.com/auth/login",
                headers: { 'Content-Type': 'application/json' },
                data : {
                    username : formData.username,
                    password : formData.password,
                },
            })
            const data = res.data;
            const token = data.token;
            localStorage.setItem("userToken" , token);
            localStorage.setItem("user" , JSON.stringify(data));
            localStorage.setItem("cart" , "");
            setLoggedInUser(data);
        }
        catch(error){
            console.log(error);
        }
    }





  return (
    <Container p={4} centerContent>
    <VStack marginTop={"50px"} width={"50%"} spacing={4}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input type="text" name="username" value={formData.username} onChange={(e)=> setFormData({...formData , username : e.target.value})} />
      </FormControl>

      

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" name="password" value={formData.password} onChange={(e)=> setFormData({...formData , password : e.target.value})} />
      </FormControl>

      <Button onClick={loginHandler} width={"100%"} colorScheme="teal" >
        Submit
      </Button>
    </VStack>
  </Container>
  )
}

export default Login
