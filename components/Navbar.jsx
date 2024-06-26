import React, { useEffect, useState } from 'react'
import NextLink from 'next/link';
import { Switch, Menu, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { CHangeMode } from '../utils/ModeSlice'
import { GET_CART_TOTAL } from '../utils/cartSlice'
import { USER_LOGOUT } from '../utils/LoginSlice'
import { useRouter } from 'next/router';
import { BsList } from "react-icons/bs";
import { motion } from 'framer-motion'

const Navbar = () => {
  const [list, setList] = useState(false)
  const dispatch = useDispatch()
  const valueMode = useSelector((state) => state.MODE.value)
  const cartItems = useSelector((state) => state.CART.cartItems)
  const userInfo = useSelector((state) => state.LOGIN.userInfo)
  const router = useRouter()
  useEffect(() => {
    dispatch(GET_CART_TOTAL())
  }, [cartItems, dispatch])
  const darkModeChangeHandler = () => {

    dispatch(CHangeMode())
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const loginMenuCloseHandler = () => {
    setAnchorEl(null)
  }
  const logoutClickHandler = () => {
    setAnchorEl(null)
    dispatch(USER_LOGOUT())
  }
  const HistoryClickHandler = () => {
    router.push('/order-history')
  }
  const ProfileClickHandler = () => {
    router.push('/profile')
  }

  return (
    <div className='bg-ground  relative container py-4 px-14 mb-9 text-white flex justify-between items-center'>

      <NextLink href='/' passHref>
        <h1 className=' cursor-pointer text-3xl' >Clothes</h1>
      </NextLink>
      <BsList className='w-14 h-14 cursor-pointer lg:hidden' onClick={() => setList(!list)} />
      {
        list && (
          <motion.div
            initial={{ transform: 'scale(0)' }}
            whileInView={{ transform: 'scale(1)' }}
            translate={{ duration: 1, type: 'spring', stiffness: 100 }}
            className='flex gap-4 items-center rounded-b-3xl flex-col lg:hidden absolute left-0 top-full z-10 bg-ground w-full p-4'>
            <NextLink href='/shopProduct' className=' cursor-pointer' passHref>
              <div className=' relative flex cursor-pointer'>

                <div>Shop</div>
              </div>
            </NextLink>
            <Switch checked={valueMode} onChange={darkModeChangeHandler}></Switch>
            <NextLink href='/Cart' className=' cursor-pointer' passHref>
              <div className=' relative flex cursor-pointer'>
                {
                  cartItems.length > 0 ? <span className=' absolute left-6 bottom-4 bg-primary rounded-full w-5 h-5 flex justify-center items-center'>{cartItems.length > 0 ? cartItems.length : ''}</span> : ''
                }
                <div>Cart</div>
              </div>
            </NextLink>
            {
              userInfo ?
                <>
                  <button onClick={loginClickHandler} className=' text-white'>{userInfo.name}</button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}

                  >
                    <MenuItem onClick={ProfileClickHandler}>Profile</MenuItem>
                    <MenuItem onClick={HistoryClickHandler}>Order Hisotry</MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
                : <NextLink href='/Login' className=' cursor-pointer' passHref>
                  Login
                </NextLink>
            }

          </motion.div>
        )
      }
      <div className='hidden lg:flex gap-4 items-center'>
        <NextLink href='/shopProduct' className=' cursor-pointer' passHref>
          <div className=' relative flex cursor-pointer'>

            <div>Shop</div>
          </div>
        </NextLink>
        <Switch checked={valueMode} onChange={darkModeChangeHandler}></Switch>
        <NextLink href='/Cart' className=' cursor-pointer' passHref>
          <div className=' relative flex cursor-pointer'>
            {
              cartItems.length > 0 ? <span className=' absolute left-6 bottom-4 bg-primary rounded-full w-5 h-5 flex justify-center items-center'>{cartItems.length > 0 ? cartItems.length : ''}</span> : ''
            }
            <div>Cart</div>
          </div>
        </NextLink>
        {
          userInfo ?
            <>
              <button onClick={loginClickHandler} className=' text-white'>{userInfo.name}</button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={loginMenuCloseHandler}

              >
                <MenuItem onClick={ProfileClickHandler}>Profile</MenuItem>
                <MenuItem onClick={HistoryClickHandler}>Order Hisotry</MenuItem>
                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
              </Menu>
            </>
            : <NextLink href='/Login' className=' cursor-pointer' passHref>
              Login
            </NextLink>
        }

      </div>
    </div>
  )
}

export default Navbar
