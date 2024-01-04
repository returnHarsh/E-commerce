import { Flex , Heading, Image ,Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons';
import React from 'react'
import { useToast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import cartAtom from '../atoms/cartDetailsAtom';

function CartComponent({product , setCart}) {

    const[cartDetails , setCartDetails] = useRecoilState(cartAtom);

    const toast = useToast();

    const deleteCartHandler = async()=>{
        const id = product.id;
        let newCart = localStorage.getItem("cart");
        newCart = JSON.parse(newCart);
        newCart = newCart.filter((e)=>{
            return (e.id != id)
        });
        localStorage.setItem("cart" , JSON.stringify(newCart));
        setCart(newCart);
        setCartDetails({items : newCart.length , price : cartDetails.price-product.price});
        showToast();
    }
    
    const showToast = () => {
        toast({
          title: "Success",
          description: `${product.title} deleted from cart` ,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      };

      
  return (
   <Flex gap={"20px"}>
    <Flex  flex={1}>
        <Image borderRadius={"20px"} src={product.thumbnail} />
    </Flex>

    <Flex gap={"20px"} flexDirection={"column"} flex={1}>
        <Heading>{product.title}</Heading>
        <Text>
            {product.description}
        </Text>
        <Text color={"green.300"} fontSize={"30px"}>₹{product.price}</Text>
    </Flex>

    <Flex >
        <DeleteIcon cursor={"pointer"} onClick={deleteCartHandler} />
    </Flex>

   </Flex>
  )
}

export default CartComponent
