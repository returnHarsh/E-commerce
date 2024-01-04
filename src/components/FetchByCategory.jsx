import { Box, Flex, Spinner , Grid , useBreakpointValue} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardComponent from './Card';

function FetchByCategory() {
    const {cat} = useParams();
    const [data , setData] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const columnCount = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

    useEffect(()=>{
        const getDataByCategory = async() =>{
            try{
                const res = await axios({
                    method: "get",
                    url : `https://dummyjson.com/products/category/${cat}`,
                })
                const data = res.data;
                setData(data.products);
            }catch(error){
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        }
            getDataByCategory();
    },[cat])

    if(isLoading){
        return <Flex justifyContent={"center"} mt={"50px"}>
            <Spinner size={"lg"}/>
        </Flex>
    }

  return (
    <Flex>
        
        <Grid rowGap={8} columnGap={5} templateColumns={`repeat(${columnCount}, 1fr)`} >
            {data.map((product)=>{
                return <CardComponent product={product} />
            })}
            </Grid>

    </Flex>
  )
}

export default FetchByCategory
