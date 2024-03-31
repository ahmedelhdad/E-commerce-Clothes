/* eslint-disable react/jsx-no-undef */
import React from 'react'
import NextLink from 'next/link';
import { FaFacebookF,FaInstagram,FaLinkedinIn  } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="container bg-white py-16 border-t border-gray-100">
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">


        <div className="space-y-4 footer flex flex-col items-center text-center lg:text-start lg:items-start">
          <NextLink href="" passHref><h1 className='text-6xl font-bold text-gray-500 '>Clothes</h1></NextLink>
          <p className='text-gray-500 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, esse sit </p>
          <div className="flex items-center text-xl text-gray-500 space-x-6">
            <NextLink href="" passHref className="text-gray-400 hover:text-gray-500">
              <span><FaFacebookF /></span>
            </NextLink>
            <NextLink href="" passHref className="text-gray-400 hover:text-gray-500">
              <span><BsTwitterX /></span>
            </NextLink>
            <NextLink href="" passHref className="text-gray-400 hover:text-gray-500">
              <span><FaInstagram/></span>
            </NextLink>
            <NextLink href="" passHref className="text-gray-400 hover:text-gray-500">
              <span><FaLinkedinIn /></span>
            </NextLink>
          </div>
        </div>
        <div className="flex justify-around">
          <div className=" flex flex-col">
            <h3 className="mb-2 text-xl font-semibold  text-gray-400 uppercase tracking-wider">Solutions</h3>
            <div className="flex flex-col text-base text-gray-400 space-y-3 ">
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Marketing</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Analytics</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Commerce</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Insights</span></NextLink>
            </div>
          </div>
          <div className="">
            <h3 className="mb-2 text-xl font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
            <div className="flex flex-col text-base text-gray-400 ">
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Pricing</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Documentation</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Guides</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>API Status</span></NextLink>
            </div>
          </div>

        </div>

        <div className=" flex justify-around ">
          <div >
            <h3 className="mb-2 text-xl font-semibold text-gray-400 uppercase tracking-wider">Solutions</h3>
            <div className=" flex flex-col text-gray-400 text-base">
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Marketing</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Analytics</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Commerce</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Insights</span></NextLink>
            </div>
          </div>
          <div className="">
            <h3 className="mb-2 text-xl font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
            <div className=" flex flex-col text-gray-400 text-base" >
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Pricing</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Documentation</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>Guides</span></NextLink>
              <NextLink href="" passHref ><span className='hover:text-gray-600 transition-all cursor-pointer'>API Status</span></NextLink>
            </div>
          </div>

        </div>

      </div>
    </div>

  )
}

export default Footer
