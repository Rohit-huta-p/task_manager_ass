import React from 'react'

const PendingLoader = () => {
  return (
    <div className='relative'>
        <div className='bg-yellow-300 animate-pulse  w-[12px] h-[12px] rounded-lg '></div>
        {/* <div className='absolute top-0 bg-yellow-300 w-[12px] h-[13px] rounded-lg'></div> */}
    </div>
  )
}

export default PendingLoader