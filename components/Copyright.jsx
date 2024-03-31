import React from 'react'
import image from '../public/images/methods.png'
import NextImage from 'next/image'
const Copyright = () => {
  return (
    <div>
    <div className="bg-gray-800 py-4">
      <div className="container flex items-center justify-between">
        <p className="text-white">&copy;Clothes - ALL Rights Reserved</p>
          <NextImage height={20} width={200} src={image} alt=''/>
      </div>
    </div>
    </div>
  )
}

export default Copyright
