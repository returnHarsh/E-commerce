import { Flex, Grid, Heading, Spinner  , Text, useBreakpointValue} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardComponent from './Card';

function FetchSearch({setCartCount}) {

    const {query} = useParams();
    const [searchProducts , setSearchProducts] = useState();
    const [isLoading , setIsLoading] = useState(true);
    const columnCount = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

    useEffect(()=>{
        const getSearch = async()=>{

            try{

                const res = await axios({
                    method : "get",
                    url : `https://dummyjson.com/products/search?q=${query}`,
                })
                let data = res.data;
                data = data.products
                // const newData =  data.filter((e)=>{
                //     return (e.description.includes(query) || (e.title.includes(query)) || (e.category.includes(query)))
                // })
                setSearchProducts(data);

            }catch(error){
                console.log(error);
            }
            finally{
                setIsLoading(false);
            }
           
        }
        getSearch();
    },[query])

    if(isLoading){
        return <Flex marginTop={"50px"} justifyContent={"center"}>
            <Spinner size={"lg"}/>
        </Flex>
    }

  return (
    <Flex marginTop={"50px"}>
        {!isLoading && searchProducts.length == 0 && <Flex width={"100%"} justifyContent={"center"} marginTop={"50px"}>  <Heading>No Items Found</Heading> </Flex>  }

            <Grid rowGap={8} columnGap={5} templateColumns={`repeat(${columnCount}, 1fr)`} >
                {searchProducts.map((e)=>{
                    return <CardComponent setCartCount = {setCartCount} key={e.id} product={e}/>
                })}
            </Grid>

    </Flex>
  )
}

export default FetchSearch
