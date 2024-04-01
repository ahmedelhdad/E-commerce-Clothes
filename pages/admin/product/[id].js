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

} from '@mui/material';
import Layout from '../../../components/Layout'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import UploadImage from '../UploadImage'
import { useRouter } from 'next/router';
import loading from '../../../public/animation/loading.json'
import Lottie from "lottie-react";

const PageProduct = ({ params }) => {
  const [product, setProduct] = useState([])
  const [uploadImage, setUploadImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
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
    try 
    {
      const getUsersAdmin = async () => {
        const respons = await axios.post(`/api/admin/products/${params.id}`,{
          headers: { authorization: `Bearer ${userInfo.token}` }
        })
       if(respons.data)
       {
        setProduct({ ...respons.data })
        setIsLoading(false)
       }
      }
      getUsersAdmin()
    }catch(err)
    {
      console.log(err)
    }
  }, [params.id, userInfo.token])

 
  const ONChangeHandler = (title) => (e) => {
    setProduct({
      ...product,
      [title]: e.target.value,
    })

  }

  const UpdataClickHandler = async (e) => {
    e.preventDefault()

    if (uploadImage) {

      product.image = uploadImage
    }


    const result = await axios.put(`/api/admin/products/${params.id}`, {
      product,
      headers: { authorization: `Bearer ${userInfo.token}` }
    })
    if (result?.data?.message) {
      toast.error(` ${result.data.message} `, {
        position: "top-left",
      })
      router.push('/admin/products');
    }
  }
  return (
    <Layout head={`Product:${params.id}`}>
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
                <ListItem selected button component="a">
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
        <Grid item md={9} xs={12}>
          <Card >
          {
                isLoading ? (
                  <h1 className=' min-h-[50vh] flex  justify-center items-center'>
                    <div className='w-40 h-40'>
                      <Lottie animationData={loading} />
                    </div>
                  </h1>
                ) : (
            <List>
              <ListItem>
                <Typography component="h5" variant="h5">
                  Edit Product :{params.id}
                </Typography>
              </ListItem>
              <ListItem>

              </ListItem>
            
                  <ListItem>
                <form>
                  <List>
                    <div className=' grid grid-cols-1 xl:grid-cols-2 gap-4'>
                      <div>
                        <input
                          onChange={ONChangeHandler('name')}
                          type='text' name='name' placeholder={product.name}
                          className='border  border-gray-300 py-3 rounded-lg  outline-none shadow-lg px-4 w-96  hover:outline-none placeholder:outline-none' />
                      </div>
                      <div>
                        <input
                          onChange={ONChangeHandler('slug')}
                          type='text' name='slug' placeholder={product.slug}
                          className='border  border-gray-300 py-3 rounded-lg  outline-none shadow-lg px-4 w-96  hover:outline-none placeholder:outline-none' />
                      </div>
                      <div>
                        <input
                          onChange={ONChangeHandler('price')}
                          type='number' name='price' placeholder={`$${product.price}`}
                          className='border  border-gray-300 py-3 rounded-lg  outline-none shadow-lg px-4 w-96  hover:outline-none placeholder:outline-none' />
                      </div>
                      <div>
                        <input
                          onChange={ONChangeHandler('category')}
                          type='text' name='category' placeholder={product.category}
                          className='border  border-gray-300 py-3 rounded-lg  outline-none shadow-lg px-4 w-96  hover:outline-none placeholder:outline-none' />
                      </div>
                      <div>
                        <input
                          onChange={ONChangeHandler('brand')}
                          type='text' name='brand' placeholder={product.brand}
                          className='border  border-gray-300 py-3 rounded-lg  outline-none shadow-lg px-4 w-96  hover:outline-none placeholder:outline-none' />
                      </div>
                      <div>
                        <input
                          onChange={ONChangeHandler('countInStock')}
                          type='number' name='countInStock' placeholder={product.countInStock}
                          className='border  border-gray-300 py-3 rounded-lg  outline-none shadow-lg px-4 w-96  hover:outline-none placeholder:outline-none' />
                      </div>
                      <div className=' col-span-2'>
                      <UploadImage setImage={setUploadImage} />
                    </div>
                      <div className='col-span-2 '>
                        <textarea
                          onChange={ONChangeHandler('description')}
                          type='text' name='description' placeholder={product.description}
                          className='border py-4 border-gray-300  w-full rounded-lg  outline-none shadow-lg px-4  hover:outline-none placeholder:outline-none' />
                      </div>

                    </div>

                    


                    <ListItem>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                        onClick={UpdataClickHandler}
                      >
                        Update
                      </Button>
                    </ListItem>
                  </List>
                </form>
              </ListItem>
              
             
            </List>
            )
          }
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}
export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}
export default dynamic(() => Promise.resolve(PageProduct), { ssr: false });
