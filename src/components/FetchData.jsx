import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Box, Flex , Spinner , Text} from '@chakra-ui/react';
import CardComponent from './Card';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';

function FetchData({setCartCount}) {

    const [products , setProducts] = useState([]);
    const [isProductLoading , setIsProductLoading] = useState(true);
    const columnCount = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });
    const [title , setTitle] = useState("")

    useEffect(()=>{
       const getAllProducts = async()=>{
           try{

            const res = await axios({
                method:"get",
                url : "https://dummyjson.com/products",
            })
            const data = res.data;
            setProducts(data.products);
           }catch(error){
            console.log(error);
           }
           finally{
            setIsProductLoading(false);
           }
        }

        getAllProducts();

        
    },[])

    if(isProductLoading){
        return <Flex marginTop={"50px"} justifyContent={"center"}>
            <Spinner size={"xl"}/>
        </Flex>
    }

  return (
   <Box mt={"20px"}>
    <Text>{title}</Text>
     <Grid rowGap={8} columnGap={5} templateColumns={`repeat(${columnCount}, 1fr)`} >
       {products.map((product)=>{
        return <CardComponent setCartCount={setCartCount} key={product.id} product={product}/>
       })}
       </Grid>
   </Box>
  )
}

export default FetchData
