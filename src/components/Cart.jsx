import { Flex, Grid, Heading , Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CartComponent from './CartComponent';
import { useRecoilState } from 'recoil';
import cartAtom from '../atoms/cartDetailsAtom';

function Cart() {

    const [cartDetails , setCartDetails] = useRecoilState(cartAtom);

    const [cart , setCart] = useState([]);
    const [cartLoading , setCartLoading] = useState(true);
   

useEffect(()=>{
    const getCartItems = async()=>{
        try{
            let cartItems = localStorage.getItem("cart");
            cartItems = JSON.parse(cartItems);
            setCart(cartItems? cartItems : []);


            let totalPrice = 0;
            cartItems.map((e)=>{
                totalPrice += e.price;
            })
            setCartDetails({items : cartItems.length , price : totalPrice});

        }catch(error){
            console.log(error);
        }finally{
            setCartLoading(false);
        }
    }

    getCartItems();
},[])

if(!cartLoading && cart.length == 0){
    return <Flex justifyContent={"center"} marginTop={"50px"}>
        <Heading>Cart is Empty</Heading>
    </Flex>
}

  return (
    <Flex marginTop={"50px"} flexDirection={"column"}>

        <Flex width={"100%"}>
            <Text flex={1} color={"gray.400"}>Total Cart Items : {cartDetails.items}   </Text>
            <Text flex={1} color={"gray.400"} >Total Price : {cartDetails.price} </Text>
        </Flex>


<Flex gap={"20px"} marginTop={"50px"} width={"100%"} flexDirection={"column"}>
{cart.map((product)=>{
            return <CartComponent  setCart = {setCart} key={product.id} product={product} />
        })}
</Flex>
        
    </Flex>
  )
}

export default Cart
