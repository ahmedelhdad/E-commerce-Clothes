/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
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
    Card,
    List,
    ListItem,
    CircularProgress,
    Button
} from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import Lottie from "lottie-react";
import loading from '../../public/animation/loading.json'
import { useRouter } from 'next/router';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {GET_ORDER} from '../../utils/cartSlice'
import { toast } from "react-toastify";

const order = ({ params }) => {

    const userInfo = useSelector((state) => state.LOGIN.userInfo)
    const {order} = useSelector((state) => state.CART)
    const [{ isPending }] = usePayPalScriptReducer();
    const [isLoading,setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        if (!userInfo) {

            router.push('/Login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])


    // const { data, isLoading } = useQuery('Orders', () => {
    //     return axios.get(`/api/orders/${params.id}`)
    // })

    useEffect(() => {
        const GETOrder = async () => 
        {
            const respons = await axios.get(`/api/orders/${params.id}`)
            if(respons.data)
            {
                dispatch(GET_ORDER(respons.data))
                setIsLoading(false)
            }
        }
        GETOrder()
    },[dispatch, params.id])
    if (isLoading) {
        return <h1 className=' min-h-[50vh] flex justify-center items-center'>
            <div className='w-40 h-40'>
                <Lottie animationData={loading} />
            </div>
        </h1>
    }
    // const price = data.data ? data.data.totalPrice : 0
    function createOrder(data, actions) {

        return actions.order
            .create({
                purchase_units: [
                    {

                        amount: { value: order.totalPrice },
                    },
                ],
            })
            .then((orderID) => {
                return orderID;
            });
    }
    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {

                const { data } = await axios.put(
                    `/api/orders/${params.id}/pay`,

                    {
                        details,
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    }
                );
                if(data.order)
                {
                    dispatch(GET_ORDER(data.order))
                    toast.success(` ${data.message} `, {
                        position: "top-right",
                    })
                }  
            } catch (err) {

                toast.success(` error `, {
                    position: "top-right",
                })
            }
        });
    }

    function onError(err) {

        console.error(err);
    }

    async function deliverOrderHandler() {
        try {
        //   dispatch({ type: 'DELIVER_REQUEST' });
          const { data } = await axios.put(
            `/api/orders/${order._id}/deliver`,
            {
              headers: { authorization: `Bearer ${userInfo.token}` },
            }
          );
          if(data.order)
          {
              dispatch(GET_ORDER(data.order))
              toast.success(` ${data.message} `, {
                  position: "top-right",
              })
          }  
        console.log(data)
        } catch (err) {
            if(data.order)
            {
                toast.success(` err `, {
                    position: "top-right",
                })
            }  
        }
      }
    // console.log(order)
    return (
        <Layout head='Order'>
            <Typography component="h5" variant="h5">
                Order :{order._id}
            </Typography>
            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <Card >
                        <List>
                            <ListItem>
                                <Typography component="h2" variant="h2">
                                    Shipping Address
                                </Typography>
                            </ListItem>
                            <ListItem>
                                {order.shippingAddress.fullName}, {order.shippingAddress.address},{' '}
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </ListItem>
                            <ListItem>
                                Status:{' '}
                                {order.isDelivered
                                    ? `delivered at ${order.deliveredAt}`
                                    : 'not delivered'}
                            </ListItem>
                        </List>
                    </Card>
                    <Card >
                        <List>
                            <ListItem>
                                <Typography component="h2" variant="h2">
                                    Payment Method
                                </Typography>
                            </ListItem>
                            <ListItem>{order.paymentMethod}</ListItem>
                            <ListItem>
                                Status: {order ? `paid at ${order.paidAt}` : 'not paid'}
                            </ListItem>
                        </List>
                    </Card>
                    <Card >
                        <List>
                            <ListItem>
                                <Typography component="h2" variant="h2">
                                    Order Items
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Image</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {


                                                order.orderItems.map((item) => {
                                                    return (
                                                        <TableRow key={item._id}>
                                                            <TableCell>
                                                                <NextLink href={`/product/fit-shirt`} passHref>
                                                                    <h1 className=' cursor-pointer'>
                                                                        <img
                                                                            src={item.image}
                                                                            alt={item.name}
                                                                            className='w-20 h-20'
                                                                        />
                                                                    </h1>
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
                                                                <Typography>{item.amount}</Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Typography>${item.price}</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })

                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card >
                        <List>
                            <ListItem>
                                <Typography variant="h2">Order Summary</Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Items:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">${order.itemsPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Tax:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">${order.taxPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Shipping:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">${order.shippingPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <strong>Total:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">
                                            <strong>${order.totalPrice}</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>

                            {!order.isPaid && (
                                <ListItem>
                                    {isPending ? (
                                        <CircularProgress />
                                    ) : (
                                        <div className='w-full'>
                                            <PayPalButtons

                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                                onError={onError}
                                            />
                                        </div>
                                    )}
                                </ListItem>
                            )}
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListItem>
                                    {/* {loadingDeliver && <CircularProgress />} */}
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={deliverOrderHandler}
                                    >
                                        Deliver Order
                                    </Button>
                                </ListItem>
                            )}

                        </List>
                    </Card>
                </Grid>
            </Grid>


        </Layout>
    )
}


export async function getServerSideProps({ params }) {
    return { props: { params } };
}
export default dynamic(() => Promise.resolve(order), { ssr: false });
