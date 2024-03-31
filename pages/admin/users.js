
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
import { GET_USERS_ADMIN } from '../../utils/AdminSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminUsers = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { usersAdmin } = useSelector((state) => state.Admin)
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
      const getUsersAdmin = async () => {
        const respons = await axios.post('/api/admin/users', {
          headers: { authorization: `Bearer ${userInfo.token}` }
        })
        if (respons.data) {
          dispatch(GET_USERS_ADMIN([...respons.data]))
          setIsLoading(false)
        }
      }
      getUsersAdmin()
    } catch (err) {
      console.log(err)
    }
  }, [])


  const deleteHandler = async (id) => {
    const UserDelete = await axios.put('/api/admin/users',{
      headers: { authorization: `Bearer ${userInfo.token}` },
      id
    })
    if (UserDelete?.data?.message) {
      dispatch(GET_USERS_ADMIN([...UserDelete.data.users]))
      toast.error(` ${UserDelete.data.message} `, {
        position: "top-left",
      })
    }

  }

  return (
    <Layout head="Users">
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
                <ListItem button component="a">
                  <ListItemText primary="Products"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/users" passHref>
                <ListItem selected button component="a">
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
                      Users
                    </Typography>

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
                  <ListItem>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>ISADMIN</TableCell>
                            <TableCell>ACTIONS</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {usersAdmin.map((user) => (
                            <TableRow key={user._id}>
                              <TableCell>{user._id.substring(20, 24)}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.isAdmin ? 'YES' : 'NO'}</TableCell>
                              <TableCell>
                                <NextLink
                                  href={`/admin/user/${user._id}`}
                                  passHref
                                >
                                  <Button size="small" variant="contained">
                                    Edit
                                  </Button>
                                </NextLink>{' '}
                                <Button
                                  onClick={() => deleteHandler(user._id)}
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
                  </ListItem>
                )
              }

            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(AdminUsers), { ssr: false });

