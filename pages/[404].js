


import React from 'react'
import Layout from '../components/Layout'
import Lottie from "lottie-react";
import Erro from '../public/animation/Erro404.json'
const Error = () => {
    return (
        <Layout >
            <div className='  lg:h-[20vh] main flex justify-center items-center'>
            <Lottie animationData={Erro} />
        </div>
        </Layout>
    )
}

export default Error
