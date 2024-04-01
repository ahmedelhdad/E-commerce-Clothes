/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-undef */
import React from 'react'
import Layout from '../components/Layout'
import { useSelector,useDispatch } from 'react-redux';
import NextLink from 'next/link';
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {DELETE_ITEM,ON_CHANGE_MOUNT} from '../utils/cartSlice' 
import Lottie from "lottie-react";
import CART from '../public/animation/Cart.json'
const Cart = () => {
  const {cartItems,count,totalPrice} = useSelector((state) => state.CART)
  const userInfo = useSelector((state) => state.LOGIN.userInfo)
  const dispatch = useDispatch()
  const router = useRouter()
  
  const checkClickHandler = () =>{
    if(!userInfo)
    {
      router.push('/Login?redirect=/Cart');
    }else 
    {
      router.push('/shipping')
    }
  }
  return (
    <Layout head='Cart'>
   
      <h1 className='text-3xl font-bold pb-4'>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className='flex justify-center items-center flex-col'>
          <div className='w-96 h-96 '>
          <Lottie animationData={CART} />
          </div>
          <NextLink href="/" passHref>
            <h1 className='text-3xl    text-blue-800 font-bold cursor-pointer'>Go shopping</h1>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <img
                              src={item.image}
                              alt={item.name}
                              className=' w-20 h-20'
                             
                            />
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          value={item.amount}
                           onChange={(e) =>
                            dispatch(ON_CHANGE_MOUNT({...item,amount:e.target.value}))
                           }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          className=' bg-blue-900'
                          onClick={() => dispatch(DELETE_ITEM(item))}
                        >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal  {count}
                    items) : $
                    {totalPrice}
                  </Typography>
                </ListItem>
                <ListItem>
                  <button
                    onClick={checkClickHandler}
              
                    
                    className='bg-primary w-full text-white py-2 rounded-lg shadow-xl text-xl hover:bg-ground'
                  >
                    Check Out
                  </button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  )
}


export default dynamic(() => Promise.resolve(Cart), { ssr: false });
