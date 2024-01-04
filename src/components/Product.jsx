import { Button, Flex, HStack, Heading, Spinner} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Image , Text } from '@chakra-ui/react';

function Product() {
    const {id} = useParams();
    const [product , setProduct] = useState({});
    const[isLoading , setIsLoading] = useState(true);


    useEffect(()=>{
        const getProduct = async()=>{
           try{

            const res = await axios({
                method : "get",
                url : `https://dummyjson.com/products/${id}`
            })
            const data = res.data;
            setProduct(data);
           }catch(error){
            console.log(error);
           }
           finally{
            setIsLoading(false);
           }
        }
        getProduct();
    },[])

  const [currentImage , setCurrentImage] = useState("");
  

    if(isLoading){
        return <Flex marginTop={"50px"} justifyContent={"center"}>
            <Spinner size={"xl"}/>
        </Flex>
    }

  return (
   <Flex gap={"50px"} marginTop={"50px"}>
    {!isLoading && !product.id && <>No product available </>}


    <Flex  flex={1} gap={"10px"} flexDirection={"column"}>
        <Flex>c
            <Image borderRadius={"lg"} src={ currentImage || product.images[0]} />
        </Flex>
          
          <Flex justifyContent={"space-between"} bg={"white"}>
          <Image transition="0.3s ease-in-out"  _hover={{padding:"10px"}} onClick={()=> setCurrentImage(product.images[0])} cursor={"pointer"}   maxWidth={"100px"} height={"auto"} src={product.images[0]} />
          <Image transition="0.3s ease-in-out"  _hover={{padding:"10px"}} onClick={()=>setCurrentImage(product.images[1])}  cursor={"pointer"}  maxWidth={"100px"} height={"auto"} src={product.images[1]} />
          <Image transition="0.3s ease-in-out"  _hover={{padding:"10px"}} onClick={()=>setCurrentImage(product.images[2])} cursor={"pointer"}  maxWidth={"100px"} height={"auto"} src={product.images[2]} />
          <Image transition="0.3s ease-in-out"  _hover={{padding:"10px"}} onClick={()=>setCurrentImage(product.images[3])}  cursor={"pointer"}  maxWidth={"100px"} height={"auto"} src={product.images[3]} />
          </Flex>

    </Flex>
 
    <Flex  justifyContent={"space-between"} flexDirection={"column"} flex={1}>

        <Flex gap={"30px"} flexDirection={"column"}>
            <Heading>{product.title}</Heading>
            <Text>{product.description}</Text>

            <Flex alignItems={"center"} width={"50%"} justifyContent={"space-between"}>
                <Text fontSize={"30px"}>₹{product.price}</Text>
                <Text color={"green.400"}>{product.discountPercentage} %</Text>
            </Flex>

            <Flex gap={"5px"} flexDirection={"column"}>
                <Text color={"yellowgreen"}>{product.rating} out of 5</Text>
                <Text fontSize={"lg"}> {product.stock} peices available </Text>
            </Flex>
        </Flex>

        <Flex gap={"40px"} >
            <Button bg={"green.500"} _hover={{bg:"green.600"}} color={"white"}>Buy Now</Button>
            <Button>Add To Cart</Button>
        </Flex>

    </Flex>


   </Flex>
  )
}

export default Product
