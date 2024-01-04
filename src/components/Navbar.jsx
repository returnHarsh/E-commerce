import { Button, Flex, HStack, Input, Select, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import cartAtom from '../atoms/cartDetailsAtom';

function Navbar() {


    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [categories, setCateories] = useState([]);
    const [isCategoryLoading, setIsCategoryLoading] = useState(true);
    const [user, setUser] = useRecoilState(userAtom);
    const cartItems = useRecoilValue(cartAtom);



    useState(() => {
        const getCategories = async () => {
            try {
                const res = await axios({
                    method: "get",
                    url: "https://dummyjson.com/products/categories"
                })
                const data = res.data;
                setCateories(data);
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsCategoryLoading(false);
            }
        }
        getCategories();

    }, [])

    const logoutHandler = async () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userToken");
        setUser(null);
    }

    const categoryChangeHandler = async (e) => {
        navigate(`/category/${e.target.value}`)
    }


    const searchHandler = async () => {
        navigate(`/${search}`);
    }

    return (
        <Flex padding={"5px"} borderRadius={"5px"} borderTop={"1px"} borderBottom={"1px"} borderColor={"gray.500"} alignItems={"center"} width={"100%"} >
            <Flex justifyContent={"center"} fontSize={{ base: "x-small", md: "x-large", lg: "xx-large" }} alignItems={"center"} flex={1}> <Link to={"/"}>Harsh's Website</Link> </Flex>
            <Flex justifyContent={"f lex-end"} gap={4} flex={1}>

                {!user && <Flex>
                    <Button fontSize={{ base: "small", lg: "medium" }} >Login</Button>
                </Flex>}

                {user && <Flex justifyContent={"center"} >
                    <Button padding={"20px"} width={{ base: "70%" }} fontSize={{ base: "x-small", lg: "medium" }} onClick={logoutHandler}>Logout</Button>
                </Flex>}



                <Flex alignItems={"center"}>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                        <Input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..." />
                        <Button paddingX={"20px"} bg={"green.400"} fontSize={{ base: "small", lg: "medium" }} marginLeft={"10px"} color={"white"} onClick={searchHandler} >Search</Button>
                    </InputGroup>
                </Flex>

                <Flex alignItems={"center"}>
                    <Icon onClick={() => navigate("/cart")} boxSize={7} cursor={"pointer"} as={FaShoppingCart} />
                    <Text marginLeft={"5px"}> {cartItems.items}  </Text>
                </Flex>

                <Flex>
                    {isCategoryLoading && <Flex alignItems={"center"}> <Text>Loading</Text> </Flex>}
                    {!isCategoryLoading && categories.length != 0 && <Select onChange={categoryChangeHandler} placeholder='categories'>
                        {categories.map((category, index) => {
                            return <option key={index} value={category}> {category} </option>
                        })}
                    </Select>}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Navbar
