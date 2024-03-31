/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
    List,
    ListItem,
    Typography,
    TextField,
    Button,
    Link,
} from '@mui/material';
import { toast } from "react-toastify";
import { USER_LIGIN } from '../utils/LoginSlice'
import { useDispatch, useSelector } from 'react-redux';
import Lottie from "lottie-react";
import loading from '../public/animation/loading.json'
const Login = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const { redirect } = router.query;
    const userInfo = useSelector((state) => state.LOGIN.userInfo)
    React.useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

      
        validateOnBlur: true,
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: async (values) => {
            const result = await axios.post('/api/users/login', { email: values.email, password: values.password })

            if (result.data.msg) {
                toast.error(` ${result.data.msg} `, {
                    position: "top-left",
                })
            }
            if (result.data.user) {
                dispatch((USER_LIGIN(result.data.user)))
                router.push(redirect || '/');
                toast(`Hello ${result.data.user.name}!`,
                    {
                        icon: '👏',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }

        },
    });
    if (userInfo) {

        return <Layout  >
            <div className='  lg:h-[10vh] main flex justify-center items-center'>
                <Lottie animationData={loading} />
            </div>
        </Layout>
    }
    return (
        <Layout className='' head='LOGIN'>
         
            <form className='flex flex-col items-center gap-4' onSubmit={formik.handleSubmit}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List className='w-[80%] md:max-w-[50%] space-y-7'>
                    <div>
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
                    <div className='flex flex-col'>
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
                    </div>
                    <ListItem>
                        <Button variant="contained" className='bg-primary py-2 text-xl' type="submit" fullWidth >
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don&apos;t have an account? &nbsp;
                        <NextLink href={'/register'} passHref>
                            <Link>Register</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Login
