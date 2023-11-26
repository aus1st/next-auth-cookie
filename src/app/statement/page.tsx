import { headers } from 'next/headers';
import React from 'react'

const page = () => {
    const usr = headers().get('usr');
    const adUser = JSON.parse(usr!);
    //const {AD_USRID, AD_USRDEPT, AD_USRNAME} = JSON.parse(usr!);  
console.log('got usr from header', adUser)
  return (
    <div className='mx-auto p-2'>
     <h1>Statement Page</h1>
      <div className='text-white'>
      <p>AD_USRID: {adUser.AD_USRID}</p>
      <p>AD_USRDEPT: {adUser.AD_USRDEPT}</p>
      <p>AD_USRNAME: {adUser.AD_USRNAME}</p>
      </div>
    </div>
  )
}

export default page
