import { Flex, Grid, Heading , Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CartComponent from './CartComponent';
import { useRecoilState } from 'recoil';
import cartAtom from '../atoms/cartDetailsAtom';

function Cart({setCartCount}) {


    const [cart , setCart] = useState([]);
    const [cartLoading , setCartLoading] = useState(true);
    const [cartDetails , setCartDetails] = useState({items : 0 , price : 0});
   

useEffect(()=>{
    const getCartItems = async()=>{
        try{
            let cart = localStorage.getItem("cart");
            cart =JSON.parse(cart);

            if(cart){
                setCart(cart.products);
                setCartDetails({items : cart.items , price : cart.price});
            }
            else{
                setCart([]);
            }

        }catch(error){
            console.log(error);
        }finally{
            setCartLoading(false);
        }
    }

    getCartItems();
    console.log('inside use state');
},[])

if(!cartLoading && cart.length == 0){
    return <Flex justifyContent={"center"} marginTop={"50px"}>
        <Heading>Cart is Empty</Heading>
    </Flex>
}

  return (
    <Flex marginTop={"50px"} flexDirection={"column"}>

        <Flex width={"100%"}>
            <Text flex={1} color={"gray.400"}>Total Cart Items : {cartDetails.items}  </Text>
            <Text flex={1} color={"gray.400"} >Total Price : {cartDetails.price}  </Text>
        </Flex>


<Flex gap={"20px"} marginTop={"50px"} width={"100%"} flexDirection={"column"}>
{cart.map((product , index)=>{
            return <CartComponent setCartCount={setCartCount}  setCartDetails = {setCartDetails} setCart = {setCart} key={index} product={product} />
        })}
</Flex>
        
    </Flex>
  )
}

export default Cart
