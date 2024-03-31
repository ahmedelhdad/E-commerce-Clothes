/* eslint-disable no-unused-vars */
import React from 'react'
import { Container } from '@mui/material'
import Navbar from './Navbar';
import Footer from './Footer.jsx'
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import Copyright from './Copyright.jsx'

const Layout = ({ children, head }) => {
  const valueMode = useSelector((state) => state.MODE.value)
  const darkTheme = createTheme({
    palette: {
      mode: valueMode ? "dark" : 'light',
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Head>
          <title>{head}</title>
        </Head>
        <CssBaseline />
        <Navbar />
        <Container className='main'>
          {children}
        </Container>
        <Footer />
        <Copyright />
      </ThemeProvider>
    </div>
  )
}

export default Layout
