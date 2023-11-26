'use client'
import router, { useRouter } from 'next/navigation'
import React from 'react'

const Navigate = () => {
    const router = useRouter();
  return (
    <div>
      <button className='p-2 bg-black text-white' onClick={()=>router.push('/statement')}>
        Statement Page
      </button>
    </div>
  )
}

export default Navigate
