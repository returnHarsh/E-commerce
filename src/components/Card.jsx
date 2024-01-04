import { Box , Stack  , Heading , Divider , Button , ButtonGroup , Image , Text, Flex, LinkBox} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
// import cartAtom from '../atoms/cartDetailsAtom'
import { useRecoilState } from 'recoil'

function CardComponent({product , setCartCount}) {

  // const [cart , setCart] = useRecoilState(cartAtom);

  const toast = useToast(); 

  const showToast = () => {
    toast({
      title: "Success",
      description: `${product.title} added to cart` ,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };


    const handleAddToCart = async()=>{

      let storedCart = localStorage.getItem("cart");
      // storedCart = storedCart? JSON.parse(storedCart) : {};
      // const newCart = [...storedCart , product];

      if(!storedCart){
        const products = [product];
        const price = product.price;
        const items = 1;

        storedCart = {products , price , items};
        localStorage.setItem("cart" , JSON.stringify(storedCart));
      }
      else{
        storedCart = JSON.parse(storedCart);
        const products = [...storedCart.products , product];
        storedCart.products = products;
        storedCart.price += product.price;
        storedCart.items = storedCart.items+1;
        localStorage.setItem("cart" , JSON.stringify(storedCart));
      }

      setCartCount(storedCart.items);

      console.log(storedCart);
      showToast();
    }

  return (
   
<Card bg={"gray.700"} color={"white"}maxWidth={"sm"} borderTop={"2px"} borderTopColor={"white"}>
  <CardBody >
    <Flex  height={"100%"} justifyContent={"space-between"} flexDirection={"column"}>
    <Link to={`/product/${product.id}`}>
  <Box height="200px" overflow="hidden">
  <Image
      src={product.thumbnail}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      objectFit={"cover"}
      transition={"5s ease-in-out"}
      _hover={{ transform: 'scale(1.5)'}}
    /> 
  </Box>
    </Link>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{product.title}</Heading>
      <Text>
        {product.description}
      </Text>

      <Flex gap={10}>
      <Text color='white' fontSize='2xl'>
      ₹{product.price}
      </Text>

      <Text  color={"yellow.200"} fontSize='2xl'>
      {product.discountPercentage}% off
      </Text>
      </Flex>

      <Text color={"orange.200"}>{product.rating} out of 5</Text>

    </Stack>
    </Flex>
    
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup  spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button  _hover={{bg:"gray.500"}} variant='ghost' colorScheme='white' onClick={handleAddToCart}>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>

  )
}

export default CardComponent
