'use client'
import { useState } from 'react';
import Navigate from '../components/Navigate';
import axios, { AxiosError } from 'axios';

// eslint-disable-next-line @next/next/no-async-client-component
export default async function ServerComponent() {

  const handleClick = async () => {
  //   const response = await fetch('http://localhost:3000/api/auth/secure', {
  //   cache: 'no-cache',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email: 'admin', password: 'admin' }),
  //   });
  //   const data = await response.json();
  //   console.log(data.status);
  //   apiresponse = data.status;
  // };
    const payload = {
       email: 'admin', password: 'admin' 
    }
    try {
      const response = await axios.post('http://localhost:3000/api/auth/secure',payload)
      console.log(response.data);
            
    } catch (error) {
      console.log((error as AxiosError).message)  
    }

  }
  await handleClick();

  return (
    <div>
      <p>{}</p>
      <Navigate/>
    </div>
  );
}
