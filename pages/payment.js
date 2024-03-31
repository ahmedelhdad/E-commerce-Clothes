/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/ckeckoutWizard'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { PAYMENT_METHOD } from '../utils/cartSlice'
import { useRouter } from 'next/router';
import {
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
    Typography,

} from '@mui/material';
import { useFormik } from 'formik';
import NextLink from 'next/link';
const payment = () => {
    const { shippingAddress, paymentMethod } = useSelector((state) => state.CART)
    const userInfo = useSelector((state) => state.LOGIN.userInfo)

    const dispatch = useDispatch()
    const router = useRouter()
    React.useEffect(() => {

        if (!shippingAddress.address) {
            router.push('/shipping');
        }else if(!userInfo)
        {
            router.push('/Login?redirect=/payment');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shippingAddress,userInfo]);
    const formik = useFormik({
        initialValues: {
            paymentMethod: paymentMethod
        },

        validateOnBlur: true,
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: async (values) => {
            dispatch(PAYMENT_METHOD(values.paymentMethod))
            Cookies.set('paymentMethod', values.paymentMethod);
            router.push('/placeorder');
        },
    });
    return (
        <Layout>
            <CheckoutWizard activeStep={2} />
            <form className='flex flex-col items-center gap-4 mt-10' onSubmit={formik.handleSubmit}>
                <Typography component="h3" variant="h3">
                    Payment Method
                </Typography>
                <List className='w-[80%] md:max-w-[50%] space-y-7'>
                    <div className='space-y-8'>

                        <ListItem>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="Payment Method"
                                    name="paymentMethod"
                                    value={formik.values.paymentMethod ? formik.values.paymentMethod : paymentMethod}

                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel
                                        label="PayPal"
                                        value="PayPal"
                                        control={<Radio />}
                                        required
                                    ></FormControlLabel>
                                    <FormControlLabel
                                        label="Stripe"
                                        value="Stripe"
                                        required
                                        control={<Radio />}
                                    ></FormControlLabel>
                                    <FormControlLabel
                                        label="Cash"
                                        value="Cash"
                                        required
                                        control={<Radio />}
                                    ></FormControlLabel>
                                </RadioGroup>
                            </FormControl>
                        </ListItem>

                    </div>

                    <button variant="contained" className='bg-primary py-2 w-full text-white hover:bg-ground transition-all rounded-lg shadow-xl text-xl' type="submit"  >
                        CONTINUE
                    </button>

                    <NextLink href={'/shipping'}>
                        <button variant="contained" className='hover:bg-primary py-2 w-full text-white bg-ground transition-all rounded-lg shadow-xl text-xl' type="submit"  >
                            Back
                        </button>
                    </NextLink>

                </List>
            </form>
        </Layout>
    )
}

export default payment
