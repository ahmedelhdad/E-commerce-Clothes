/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ListInput from '../components/ListInput'
import axios from 'axios';
import { Grid, CardMedia, CardContent, Typography, CardActions, Button, Link } from '@mui/material'
import NextLink from 'next/link';
import { useDispatch } from 'react-redux';
import { CART_ADD_ITEM } from '../utils/cartSlice'
import { motion } from 'framer-motion'
import BtnCart from '../public/animation/ButtonCart.json'
import Lottie from "lottie-react";
import loading from '../public/animation/loading.json'
import { toast } from "react-toastify";

const shopProduct = () => {
    const [data, setData] = useState([])
    const [list, setList] = useState(data)
    const [isLoading, setIsLoading] = useState(true)
    const [brand, setBrand] = useState([

        {
            id: 1,
            checked: false,
            label: 'Nike'
        },
        {
            id: 2,
            checked: false,
            label: 'Adidas'
        },
        {
            id: 3,
            checked: false,
            label: 'Puma'
        },
        {
            id: 4,
            checked: false,
            label: 'New balance'
        },
        {
            id: 5,
            checked: false,
            label: 'Zara'
        }
    ])
    const dispatch = useDispatch()
    const [min, setMin] = useState(0)
    const [max, setMax] = useState()

    useEffect(() => {
        try {
            const getCate = async () => {
                const respons = await axios.get('http://localhost:3000/api/products')

                if (respons.data) {
                    setData(await respons.data)
                    setList(await respons.data)
                    setIsLoading(false)
                }
            }
            getCate();
        } catch (err) {
            console.log(err)
        }

    }, []);









    const handlerChecked = (e) => {
        const categoryChecked = brand.map((item) => item.id === +e.target.id ? { ...item, checked: !item.checked } : item)
        setBrand(categoryChecked)
    }

    const applyFilters = () => {
        let updateList = data
        const categoryChecked = brand.filter((item) => item.checked).map((item) => item.label)
        if (categoryChecked.length) {
            updateList = updateList.filter((item) => categoryChecked.includes(item.brand))
        }
        if (min && max) {
            updateList = updateList.filter((item) => item.price >= min && item.price <= max);
        }
        setList(updateList)

    }
    useEffect(() => { applyFilters() }, [brand, max, min])
    const addToCartHandler = async (product) => {

        const { data } = await axios.get(`http://localhost:3000/api/products/${product._id}`)
        if (data.countInStock <= 0) {
          toast.info('Sorry . Product is out of stock', {
            position: "top-center",
          })
        } else {
          dispatch(CART_ADD_ITEM(product))
        }
    
      }
    return (
        <Layout head='Shop'>
            <div className='grid grid-cols-1 lg:grid-cols-5'>
                <div className=' border-gray-300 border-b-[1px] bg-gray-100 p-8 shadow-2xl h-96'>
                    {/* Category        */}
                    <div>
                        <h1 className='text-3xl   pb-4'>Category</h1>
                        <ListInput category={brand} handlerChecked={handlerChecked} />
                    </div>
                    {/* Price  */}
                    <div className="pt-4">
                        <h3 className="text-xl text-gray-800 mb-3 uppercase font-bold">price</h3>
                        <div className="flex space-x-4 items-center">
                            <input type="text" placeholder="min" onChange={(e) => setMin(e.target.value)} className="w-full px-3 py-1 text-gray-600 text-sm shadow-md rounded-md border-gray-300 focus:ring-0 focus:border-primary" />
                            <div className="mx-3 text-gray-600">-</div>
                            <input type="text" placeholder="max" onChange={(e) => setMax(e.target.value)} className="w-full px-3 py-1 text-gray-600 text-sm shadow-md rounded-md border-gray-300 focus:ring-0 focus:border-primary" />
                        </div>
                    </div>
                </div>
                {
                    isLoading ? (
                        <div className=' min-h-[50vh] col-span-4   flex justify-center items-center'>
                            <div className='w-40 h-40'>
                                <Lottie animationData={loading} />
                            </div>
                        </div>
                    ) : (
                        <div className='col-span-4'>
                            <div

                                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                                {
                                    list.map((product) => {
                                        return (
                                            <Grid item md={4} key={product.name}>
                                                <motion.div
                                                    initial={{ transform: 'scale(0)' }}
                                                    whileInView={{ transform: 'scale(1)' }}
                                                    translate={{ duration: 1, type: 'spring', stiffness: 100 }}
                                                    className='  shadow-2xl p-1 overflow-hidden rounded-3xl'>
                                                    <NextLink href={`/product/${product.slug}`} passHref>
                                                        <Link>
                                                            <CardMedia component='img' className=' hover:scale-105 lg:h-72 transition-all' image={product.image} title={product.name} ></CardMedia>
                                                        </Link>
                                                    </NextLink>
                                                    <CardContent>
                                                        <Typography className=' underline-offset-0'>{product.name ? product.name.substring(0, 25) : ''}</Typography>
                                                    </CardContent>

                                                    <CardActions>
                                                        <Typography>${product.price}</Typography>
                                                        <Button onClick={() => addToCartHandler(product)} size="small" color='primary' className='text-gray-500 hover:text-primary'>
                                                            Add to cart
                                                            <Lottie animationData={BtnCart} className='w-20 h-20' />

                                                        </Button>
                                                    </CardActions>



                                                </motion.div>

                                            </Grid>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }

            </div>
        </Layout>
    )
}

export default shopProduct