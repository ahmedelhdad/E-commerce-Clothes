
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
  TextField,
  
} from '@mui/material';
import Layout from '../../../components/Layout'
import axios from 'axios';
import { toast } from "react-toastify";
import { GET_USER_ID } from '../../../utils/AdminSlice'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import loading from '../../../public/animation/loading.json'
import Lottie from "lottie-react";
const UserEdit = ({ params }) => {
  const dispatch = useDispatch()
  const [isAdmin, setIsAdmin] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { userAdminId } = useSelector((state) => state.Admin)
  const userInfo = useSelector((state) => state.LOGIN.userInfo)
  const router = useRouter()

  useEffect(() => {
    if (!userInfo) {
      router.push('/Login?redirect=/admin/dashboard');
    } else if (!userInfo.isAdmin) {
      router.push('/');
    }
  }, [router, userInfo])
  useEffect(() => {
    try {
      const getUsersIdAdmin = async () => {
        const respons = await axios.post('/api/admin/user', {
          id: params.id,
          headers: { authorization: `Bearer ${userInfo.token}` }
        })
        // console.log(respons.data)
        if (respons.data) {
          dispatch(GET_USER_ID(respons.data))
          setIsLoading(false)
        }
      }
      getUsersIdAdmin()
    } catch (err) {
      console.log(err)
    }
  }, [dispatch, params.id, userInfo.token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.put('/api/admin/user', {
        isAdmin,
        id: params.id,
        headers: { authorization: `Bearer ${userInfo.token}` }
      })
      if (result?.data?.message) {
        toast.error(` ${result.data.message} `, {
          position: "top-left",
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Layout head={`Edit User $'{userAdminId?.name'}`}>
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
        {
          isLoading ? (
            <h1 className=' min-h-[10vh] flex w-full   justify-center items-center'>
                    <div className='w-40 h-40'>
                      <Lottie animationData={loading} />
                    </div>
                  </h1>
          ) : (
            <Grid item md={9} xs={12}>
              <Card >
                <List>
                  <ListItem>
                    <Typography component="h1" variant="h1">
                      {/* Edit User {userId} */}
                    </Typography>
                  </ListItem>
                  <ListItem>

                  </ListItem>
                  <ListItem>
                    <form>
                      <List>
                        <ListItem>
                          <div className='flex flex-col'>
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="name"
                              label="Name"
                              inputProps={{ type: 'text' }}
                              name="name"
                              value={userAdminId?.name}

                            />
                          </div>
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
                              <select value={isAdmin ? isAdmin : userAdminId.isAdmin} className='py-2 px-2 w-32' onChange={(e) => setIsAdmin(e.target.value)} >
                                <optgroup label='Is Admin'>
                                  <option value='true'>True</option>
                                  <option value='false' >False</option>
                                </optgroup>
                              </select>

                            </ListItem>
                          )
                        }
                        <ListItem>
                          <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="primary"
                            onClick={handleSubmit}

                          >
                            Update
                          </Button>
                        </ListItem>
                      </List>
                    </form>
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

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(UserEdit), { ssr: false });
