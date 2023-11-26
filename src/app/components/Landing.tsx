'use client'
import { redirect } from 'next/navigation';
import React, { FC } from 'react'

// eslint-disable-next-line @next/next/no-async-client-component
const Landing:FC<{uid?: string}> = async ({uid}) => {

  const res = await fetch('http://localhost:3000/api/auth/login', {
   // cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({uid: uid}),
  })

  if (!res.ok) {
    redirect("/login");
  }

  const result = await res.json();

  //await createCookie(result.users) 
  console.log('api response in component',result)

  return (
    <div>
      <h1 className='text-2xl mx-auto mt-5'>Landing Client Component</h1>
    </div>
  )
}

export default Landing
