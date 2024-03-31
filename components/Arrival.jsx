/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { CardMedia, CardContent, Typography, CardActions, Button, Link } from '@mui/material'
import { motion } from 'framer-motion'
import NextLink from 'next/link';
import { CART_ADD_ITEM } from '../utils/cartSlice'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Lottie from "lottie-react";
import loading from '../public/animation/loading.json'
import BtnCart from '../public/animation/ButtonCart.json'

import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';

const Arrival = () => {
    const dispatch = useDispatch()
    const { data, isLoading } = useQuery('arrival', () => {
        return axios.get('/api/home/arrival')
    })

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
        <div className=' '>
            <h1 className='text-3xl font-bold py-8'>Arrival</h1>
            {
                isLoading ? (
                    <h1 className=' min-h-[50vh] flex justify-center items-center'>
            <div className='w-40 h-40'>
                <Lottie animationData={loading} />
            </div>
        </h1>
                ) : (
                    <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode]}
                className="mySwiper"
            >
                

                {
                    data?.data.map((product) => {
                        return (
                            <SwiperSlide key={product.name}>
                                <motion.div
                                    initial={{ transform: 'scale(0)' }}
                                    whileInView={{ transform: 'scale(1)' }}
                                    translate={{ duration: 1, type: 'spring', stiffness: 100 }}
                                >
                                    <NextLink href={`/product/${product.slug}`} passHref>
                                        <Link>
                                            <CardMedia component='img' className=' hover:scale-105 h-96  transition-all' image={product.image} title={product.name} ></CardMedia>
                                        </Link>
                                    </NextLink>
                                    <CardContent>
                                        <Typography className=' underline-offset-0'>{product.name ? product.name.substring(0, 5) : ''}</Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Typography>${product.price}</Typography>
                                        <Button onClick={() => addToCartHandler(product)} size="small" color='primary' className='text-gray-500 hover:text-primary'>
                                            <span className='hidden lg:flex'>Add to cart</span>
                                            <Lottie animationData={BtnCart} className='w-20 h-20' />

                                        </Button>
                                    </CardActions>



                                </motion.div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
                )
            }
            
        </div>
    )
}


export default Arrival
