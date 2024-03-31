/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { registerSchema } from '../utils/ValidationSchemaRegister'
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

const register = () => {
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
            name: '',
            email: '',
            password: '',
            ConfirmPassword: ''
        },

        validationSchema: registerSchema,
        validateOnBlur: true,
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: async (values) => {
            const result = await axios.post('/api/users/register', { name: values.name, email: values.email, password: values.password })

            if (result.data.msg) {
                toast.error(` ${result.data.msg} `, {
                    position: "top-left",
                })
            }
            if (result.data.user) {
                dispatch((USER_LIGIN(result.data.user)))
                router.push(redirect || '/')
            }

        },
    });
    if (userInfo) {

        return <Layout className='   ' >
            <div className='  lg:h-[20vh] main flex justify-center items-center'>
                <Lottie animationData={loading} />
            </div>
        </Layout>
    }
    return (

        <Layout className='' head='REGISTER'>
           
            <form className='flex flex-col items-center gap-4' onSubmit={formik.handleSubmit}>
                <Typography component="h1" variant="h1">
                    Register
                </Typography>
                <List className='w-[80%] md:max-w-[50%] space-y-7'>
                    <div>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            label="Name"
                            inputProps={{ type: 'text' }}
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}

                        />
                        <span className='  text-red-600' type='invalid'>{formik.errors.name}</span>

                    </div>
                    <div className='flex flex-col'>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="email"
                            inputProps={{ type: 'email' }}
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                        />
                        <span className='  text-red-600' type='invalid'>{formik.errors.email}</span>
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
                        <span className='  text-red-600' type='invalid'>{formik.errors.password}</span>
                    </div>
                    <div className='flex flex-col'>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="ConfirmPassword"
                            label="ConfirmPassword"
                            inputProps={{ type: 'password' }}
                            name="ConfirmPassword"
                            onChange={formik.handleChange}
                            value={formik.values.ConfirmPassword}
                            onBlur={formik.handleBlur}



                        />
                        <span className='  text-red-600' type='invalid'>{formik.errors.ConfirmPassword}</span>
                    </div>

                    <ListItem>
                        <Button variant="contained" className='bg-primary py-2 text-xl' type="submit" fullWidth >
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already have an account? &nbsp;
                        <NextLink href={'/Login'} passHref>
                            <Link>Register</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default register
