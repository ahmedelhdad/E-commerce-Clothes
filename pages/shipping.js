/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
    List,
    ListItem,
    Typography,
    TextField,

} from '@mui/material';
import { SHIPPING_ADDRESS } from '../utils/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/ckeckoutWizard'
const shipping = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const userInfo = useSelector((state) => state.LOGIN.userInfo)
    const shippingAddress = useSelector((state) => state.CART.shippingAddress)
    React.useEffect(() => {
        if (!userInfo) {
            router.push('/Login?redirect=/shipping');
        } 
    }, [userInfo]);

    const formik = useFormik({
        initialValues: {
            fullName: shippingAddress.fullName ? shippingAddress.fullName:'',
            address: shippingAddress.address ? shippingAddress.address:'',
            city: shippingAddress.city ? shippingAddress.city:'',
            postalCode: shippingAddress.postalCode ? shippingAddress.postalCode:'',
            country: shippingAddress.country ? shippingAddress.country:''
        },

        validateOnBlur: true,
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: async (values) => {
            dispatch(SHIPPING_ADDRESS(values ? values : shippingAddress))
            Cookies.set('shippingAddress',JSON.stringify(values ? values : shippingAddress))
             router.push('/payment');
        },
    });
    return (

        <Layout  head='shipping'>
            <CheckoutWizard activeStep={1}/>
            <form className='flex flex-col items-center gap-4' onSubmit={formik.handleSubmit}>
                <Typography component="h3" variant="h3">
                    Shipping Address
                </Typography>
                <List className='w-[80%] md:max-w-[50%] space-y-7'>
                    <div className='space-y-8'>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="fullName"
                            label="Full Name "
                            inputProps={{ type: 'text' }}
                            name="fullName"
                            onChange={formik.handleChange}
                            required
                            value={formik.values.fullName}
                             />
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="address"
                            label="Address"
                            inputProps={{ type: 'text' }}
                            name="address"
                            onChange={formik.handleChange}
                            required
                            value={formik.values.address}
                             />
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="city"
                            label="City"
                            inputProps={{ type: 'text' }}
                            name="city"
                            required
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            />
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="postalCode"
                            label="Postal Code"
                            inputProps={{ type: 'text' }}
                            name="postalCode"
                            required
                            onChange={formik.handleChange}
                            value={formik.values.postalCode}
                             />
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="country"
                            label="country"
                            inputProps={{ type: 'text' }}
                            name="country"
                            required
                            onChange={formik.handleChange}
                            value={formik.values.country}
                            />


                    </div>
                    <ListItem>
                        <button variant="contained" className='bg-primary py-2 w-full text-white hover:bg-ground transition-all rounded-lg shadow-xl text-xl' type="submit"  >
                            CONTINUE
                        </button>
                    </ListItem>
                 
                </List>
            </form>
        </Layout>
    )
}

export default shipping
