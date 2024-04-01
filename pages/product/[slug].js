/* eslint-disable no-undef */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import NextLink from 'next/link';
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from 'react-query';
import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,

} from '@mui/material';
import Lottie from "lottie-react";
import loading from '../../public/animation/loading.json'
import { useDispatch } from 'react-redux';
import { CART_ADD_ITEM } from '../../utils/cartSlice'
import { toast } from "react-toastify";
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic';

const productScreen = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const { slug } = router.query
  const { redirect } = router.query;
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const { data, isLoading } = useQuery('Products', () => {
    return axios.get('/api/products')
  })
  if (isLoading) {
    return <h1 className=' min-h-[50vh] flex justify-center items-center'>
      <div className='w-40 h-40'>
        <Lottie animationData={loading} />
      </div>
    </h1>
  }
  const product = data.data.find((a) => a.slug === slug)

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  const addToCartHandler = async () => {

    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock <= 0) {
      toast.info('Sorry . Product is out of stock', {
        position: "top-center",
      })
    } else {
      dispatch(CART_ADD_ITEM(product))
    }

  }
  const transiton = { duration: 1, type: 'spring', stiffness: 100 }

  return (
    <Layout head={product.name}>
      <div>
        <NextLink href={redirect || '/'} passHref>
          <div className='hover:text-primary text-2xl text-gray-600 cursor-pointer'>
            <Typography>back to products</Typography>
          </div>
        </NextLink>
      </div>
      <motion.div
        initial={{ transform: 'scale(0)' }}
        whileInView={{ transform: 'scale(1)' }}
        translate={transiton}
      >
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>

            <img
              src={product.image}
              alt={product.name}
              layout="responsive"
         />
        </Grid>
          <Grid item md={3} xs={12}>
            <List>
              <ListItem>
                <Typography component="h3" variant="h3">
                {product.name?product.name.substring(0,30):''}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand: {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Rating: {product.rating} stars ({product.numReviews} reviews)
                </Typography>
              </ListItem>
              <ListItem>
                <Typography> Description: {product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <button

                    className='bg-primary w-full py-2 rounded-xl'
                    onClick={addToCartHandler}>
                    Add to cart
                  </button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Layout>
  )
}


export default dynamic(() => Promise.resolve(productScreen), { ssr: false });

