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
  CardContent,
  CardActions,
} from '@mui/material';
import Layout from '../../components/Layout'
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  Chart as ChartJS, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title
} from "chart.js";
import { Bar } from "react-chartjs-2";
import loading from '../../public/animation/loading.json'
import Lottie from "lottie-react";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const dashboard = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const userInfo = useSelector((state) => state.LOGIN.userInfo)
  const router = useRouter()

  useEffect(() => {
    if (!userInfo) {
      router.push('/Login?redirect=/admin/dashboard');
    }else if(!userInfo.isAdmin)
    {
      router.push('/');
    }
  }, [userInfo])



  useEffect(() => {
    const getDeshboard = async () => {
      try {
        const respons = await axios.post('/api/admin/summary', {
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
    getDeshboard()
  }, [])






  const summary = data ? { ...data.data } : { salesData: [] }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
    Tooltip,
  )
  const options = {
    legend: { display: true, position: 'right' },

  }
  const dataChart = {
    labels: summary.salesData.map((x) => x._id),
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(162, 222, 208, 1)',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  }

  return (
    <Layout head="Admin Dashboard">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card >
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem button component="a">
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
        {
          isLoading ? (
            <h1 className=' min-h-[20vh] flex  w-full  justify-center items-center'>
              <div className='w-40 h-40'>
                <Lottie animationData={loading} />
              </div>
            </h1>
          ) : (<Grid item md={9} xs={12}>
            <Card >
              <List>

                <Grid container spacing={5}>
                  <Grid item md={3}>
                    <Card raised>
                      <CardContent>
                        <Typography variant="h5">
                          ${data.data.ordersPrice}
                        </Typography>
                        <Typography>Sales</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/admin/orders" passHref>
                          <Button size="small" color="primary">
                            View sales
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item md={3}>
                    <Card raised>
                      <CardContent>
                        <Typography variant="h5">
                          {data.data.ordersCount}
                        </Typography>
                        <Typography>Orders</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/admin/orders" passHref>
                          <Button size="small" color="primary">
                            View orders
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item md={3}>
                    <Card raised>
                      <CardContent>
                        <Typography variant="h5">
                          {data.data.productsCount}
                        </Typography>
                        <Typography>Products</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/admin/products" passHref>
                          <Button size="small" color="primary">
                            View products
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item md={3}>
                    <Card raised>
                      <CardContent>
                        <Typography variant="h5">
                          {data.data.usersCount}
                        </Typography>
                        <Typography>Users</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/admin/users" passHref>
                          <Button size="small" color="primary">
                            View users
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>

                <ListItem>
                  <Typography component="h2" variant="h2">
                    Sales Chart
                  </Typography>
                </ListItem>
                <ListItem>
                  {
                    <Bar options={options} data={dataChart} />
                  }
                </ListItem>
              </List>
            </Card>
          </Grid>)
        }

      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(dashboard), { ssr: false });
