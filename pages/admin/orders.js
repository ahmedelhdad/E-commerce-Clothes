
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
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const Admonorders = () => {

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
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
    const getorderAdmin = async () => {
      try {
        const respons = await axios.post('/api/admin/orders', {
          headers: { authorization: `Bearer ${userInfo.token}` }
        })
        if (respons.data) {
          setData(respons)
          // console.log(respons)
          setIsLoading(false)
        }

      } catch (err) {
        console.log(err)
      }
    }
    getorderAdmin()
  }, [])





  return (
    <Layout head="Orders">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Orders"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/products" passHref>
                <ListItem button component="a">
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
                <Typography component="h1" variant="h1">
                  Orders
                </Typography>
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
                          <TableCell>USER</TableCell>
                          <TableCell>DATE</TableCell>
                          <TableCell>TOTAL</TableCell>
                          <TableCell>PAID</TableCell>
                          <TableCell>DELIVERED</TableCell>
                          <TableCell>ACTION</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data?.data.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id.substring(20, 24)}</TableCell>
                            <TableCell>
                              {order.user ? order.user.name : 'DELETED USER'}
                            </TableCell>
                            <TableCell>{order.createdAt}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell>
                              {order.isPaid
                                ? `paid at ${order.paidAt}`
                                : 'not paid'}
                            </TableCell>
                            <TableCell>
                              {order.isDelivered
                                ? `delivered at ${order.deliveredAt}`
                                : 'not delivered'}
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/order/${order._id}`} passHref>
                                <Button variant="contained">Details</Button>
                              </NextLink>
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

export default dynamic(() => Promise.resolve(Admonorders), { ssr: false });
