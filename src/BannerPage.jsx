import React from 'react'

const BannerPage = () => {
  return (
   <>
   <div className='flex justify-between mx-auto w-[1600px] h-[900px] '>
      <div className='mt-60 ml-40 justify-center '>
        <h1 className='text-5xl text-red-600'>SALE UPTO 30% OFF</h1>
        <h1 className='text-7xl font-semibold'>Electronic Product Series</h1>
        <h3 className='text-xl'>Feature packed at a better value than ever Powerful sensors <br /> to monitor your life</h3>
      </div>
      
      <div className='w-[900px] h-[800px] '>
      <img className='w-[600px] ' src="https://i.pinimg.com/736x/5e/05/b4/5e05b4172e07b18d9428619e26697682.jpg" alt="" />
      </div>
      </div>
    
    
   </>
  )
}

export default BannerPage
