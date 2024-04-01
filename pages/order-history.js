/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import Lottie from "lottie-react";
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import loading from '../public/animation/loading.json'
import {
  Grid,
  List,
  ListItem,
  TableContainer,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ListItemText,
  Button
} from '@mui/material';
import { format } from "timeago.js";

const orderHistory = () => {
  const userInfo = useSelector((state) => state.LOGIN.userInfo)
  const [order, setOrder] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  // eaders: { authorization: `Bearer ${userInfo.token}` }
  React.useEffect(() => {

    if (!userInfo) {
      router.push('/Login?redirect=/order-history');
    }
  }, [router, userInfo])

  React.useEffect(() => {
    const getOrders = async () => {
      try {
        const respons = await axios.post('/api/orders/history', {
          headers: { authorization: `Bearer ${userInfo.token}` }
        })

        if (respons.data) {
          setOrder(respons.data)
          setIsLoading(false)
        }
        
      } catch (err) {
        console.log(err)
      }
    }
    getOrders()
  }, [userInfo.token])




  return (
    <Layout head="Order History">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem button component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/order-history" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Order History"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        {
          isLoading ? (
            <h1 className=' min-h-[50vh] w-full  flex justify-center items-center'>
      <div className='w-40 h-40'>
        <Lottie animationData={loading} />
      </div>
    </h1>
          ): (
            <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Order History
                </Typography>
              </ListItem>
              <ListItem>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>DATE</TableCell>
                        <TableCell>TOTAL</TableCell>
                        <TableCell>PAID</TableCell>
                        <TableCell>DELIVERED</TableCell>
                        <TableCell>ACTION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order?.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id.substring(20, 24)}</TableCell>
                          <TableCell>
                            {format(order.createdAt)}
                          </TableCell>
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

              </ListItem>
            </List>
          </Card>
        </Grid>
          )
        }
      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(orderHistory), { ssr: false });
