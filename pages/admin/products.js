/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import Layout from '../../components/Layout'
import axios from 'axios';
import loading from '../../public/animation/loading.json'
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { GET_ORDER_ADMIN } from '../../utils/AdminSlice'
import { useRouter } from 'next/router';

const AdminProdcuts = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { productAdmin } = useSelector((state) => state.Admin)
  const userInfo = useSelector((state) => state.LOGIN.userInfo)
  const router = useRouter()
  useEffect(() => {
    if (!userInfo) {
      router.push('/Login?redirect=/admin/dashboard');
    } else if (!userInfo.isAdmin) {
      router.push('/');
    }
  }, [userInfo])

  useEffect(() => {
    try {
      const getOrderAdmin = async () => {
        const respons = await axios.post('/api/admin/products', {
          headers: { authorization: `Bearer ${userInfo.token}` }
        })
        dispatch(GET_ORDER_ADMIN([...respons.data]))
        setIsLoading(false)
      }
      getOrderAdmin()
    } catch (err) {
      console.log(err)
    }

  }, [])



  const createHandler = async () => {
    try {
      const result = await axios.put('/api/admin/products', {
        headers: { authorization: `Bearer ${userInfo.token}` }
      })
      if(result.data.product)
      {
        dispatch(GET_ORDER_ADMIN([...productAdmin, result.data.product]))
      }

      if (result?.data?.message) {
        toast.error(` ${result.data.message} `, {
          position: "top-left",
        })
      }
    } catch (err) {
      console.log(err)
    }
  }


  const deleteHandler = async (id) => {
    try 
    {
      const result = await axios.post(`/api/admin/products/delete`,{
        headers: { authorization: `Bearer ${userInfo.token}` },
        id
      })
      console.log(result.data)
      if(result.data.products)
      {
        dispatch(GET_ORDER_ADMIN([...result.data.products]))
      }
      if (result?.data?.message) {
        toast.error(` ${result.data.message} `, {
          position: "top-left",
        })
      }
    }catch (err) {
      console.log(err)
    }
  }




  return (
    <Layout head="Products">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card >
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Orders"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/products" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Products"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/users" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Users"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card >
            <List>
              <ListItem>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography component="h1" variant="h1">
                      Products
                    </Typography>

                  </Grid>
                  <Grid align="right" item xs={6}>
                    <Button
                      onClick={createHandler}
                      color="primary"
                      variant="contained"
                    >
                      Create
                    </Button>

                  </Grid>
                </Grid>
              </ListItem>



              {
                isLoading ? (
                  <h1 className=' min-h-[50vh] flex  justify-center items-center'>
                    <div className='w-40 h-40'>
                      <Lottie animationData={loading} />
                    </div>
                  </h1>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>NAME</TableCell>
                          <TableCell>PRICE</TableCell>
                          <TableCell>CATEGORY</TableCell>
                          <TableCell>COUNT</TableCell>
                          <TableCell>RATING</TableCell>
                          <TableCell>ACTIONS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productAdmin.map((product) => (

                          <TableRow key={product._id}>
                            <TableCell>
                              {product?._id.substring(20, 24)}
                            </TableCell>
                            <TableCell>{product?.name}</TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.countInStock}</TableCell>
                            <TableCell>{product.rating}</TableCell>
                            <TableCell>
                              <NextLink
                                href={`/admin/product/${product._id}`}
                                passHref
                              >
                                <Button size="small" variant="contained">
                                  Edit
                                </Button>
                              </NextLink>{' '}
                              <Button
                                onClick={() => deleteHandler(product._id)}
                                size="small"
                                variant="contained"
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
              }



            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(AdminProdcuts), { ssr: false });

