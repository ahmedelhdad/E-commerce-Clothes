import React from 'react'
import delivery from '../public/Icon/delivery-van.svg'
import Money from '../public/Icon/money-back.svg'
import hours from '../public/Icon/service-hours.svg'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Service = () => {
    const transiton = { duration: 1, type: 'spring', stiffness: 100 }

  return (
    <div className="container py-14 ">
      <motion.div
      initial={{ transform: 'scale(0)' }}
                    whileInView={{ transform: 'scale(1)' }}
                    translate={transiton}
       className="grid grid-cols-1 text-gray-600 md:grid-cols-2 lg:grid-cols-3  w-10/12 mx-auto  gap-8 ">
        <div className="border border-ground py-6  rounded-md  space-x-4 px-3 flex justify-center items-center">
          <Image src={delivery} width={50} height={50} alt="" />
          <div>
            <h4 className="font-bold text-gra ">Free Shipping</h4>
            <span className="text-gray-400">Order over $200</span>
          </div>
        </div>
        <div className="border border-ground py-6  space-x-4 px-3 flex justify-center items-center">
        <Image src={Money} width={50} height={50} alt="" />
          <div>
            <h4 className="font-bold ">Money Returns</h4>
            <span className="text-gray-400">30 days money return</span>
          </div>
        </div>
        <div className="border border-ground py-6 space-x-4 px-3 flex justify-center items-center">
        <Image src={hours} width={50} height={50} alt="" />
          <div>
            <h4 className="font-bold ">24/7 Support</h4>
            <span className="text-gray-400">Customer Suppart</span>
          </div>
        </div>
    
      </motion.div>
    </div>
  )
}

export default Service
