/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { motion } from 'framer-motion'


const Landing = () => {

  return (
  <motion.div
      initial={{ transform: 'scale(0)' }}
      animate={{ rotate: 360, transform: 'scale(1)' }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 15
      }}
      className='min-h-[50vh] bg-landing relative bg-no-repeat back  '>
      <div className=' absolute left-16 top-[50%] tracking-[.25em]   translate-y-[-50%] text-white text-8xl md:text-9xl space-y-9 '>
        <h1 className='' >New</h1>
        <h1>Style</h1>
      </div>
    </motion.div> 
  )
}

export default Landing






