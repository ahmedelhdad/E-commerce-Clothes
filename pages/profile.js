/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Layout from '../components/Layout'
import { USER_LIGIN } from '../utils/LoginSlice'
import dynamic from 'next/dynamic';
import { CgProfile } from "react-icons/cg";

import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TextField
} from '@mui/material';
import { toast } from "react-toastify";

import { useSelector,useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { registerSchema } from '../utils/ValidationSchemaRegister'
const profile = () => {
  const rouer = useRouter()
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.LOGIN.userInfo)
  useEffect(() => {
    if(!userInfo)
    {
      rouer.push('/Login?redirect=/profile')
    }
  },[userInfo])
  const formik = useFormik({
    initialValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      password: '',
      ConfirmPassword: ''
    },

    validationSchema: registerSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: async (values) => {

      try 
      {
        
      const result = await axios.post('api/users/profile',{
        id:userInfo._id,
        name:values.name,
        email:values.email,
        password:values.password,
        headers: { authorization: `Bearer ${userInfo.token}` }

      })
  
      if (result.data.msg) {
        toast.error(` ${result.data.msg} `, {
            position: "top-left",
        })
    }
      if(result?.data?.user)
      {
        dispatch((USER_LIGIN(result.data.user)))
        toast.error(` Success `, {
          position: "top-left",
      })
      }
      }catch(err)
      {
        console.log(err)
      }
    },

  });






  return (
    <Layout head="Profile">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card >
            <List>
              <NextLink href="/profile" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/order-history" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Order History"></ListItemText>
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
                  Profile
                </Typography>
              </ListItem>
              <ListItem>
                <form
                  onSubmit={formik.handleSubmit}

                >
                  <List className=' space-y-10'>

                    <div className=' w-96 flex flex-col'>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Name"
                        inputProps={{ type: 'text' }}

                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur} />
                    </div>
                    <div className=' w-96 flex flex-col'>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email"
                        inputProps={{ type: 'text' }}

                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}

                      />
                    </div>
                    
                    <div className=' w-96 flex flex-col'>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="password"
                        label="Password"
                        inputProps={{ type: 'password' }}

                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}

                      />
                      <span className='  text-red-600' type='invalid'>{formik.errors.password}</span>

                    </div>
                    <div className=' w-96 flex flex-col'>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="ConfirmPassword"
                        label="Confirm Password"
                        inputProps={{ type: 'password' }}

                        name="ConfirmPassword"
                        onChange={formik.handleChange}
                        value={formik.values.ConfirmPassword}
                        onBlur={formik.handleBlur}

                      />
                      <div className='  text-red-600' type='invalid'>{formik.errors.ConfirmPassword}</div>

                    </div>



                    <ListItem>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
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
      </Grid>
    </Layout>
  )
}



export default dynamic(() => Promise.resolve(profile), { ssr: false });
