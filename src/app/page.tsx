import Image from 'next/image'
import { redirect } from 'next/navigation';
import {cookies, headers} from 'next/headers'
import { createCookie } from '@/lib';
import Landing from './components/Landing';


export default async function Home() {
  const uid = headers().get('uid');
  //const uid = "9xsjkdfjakldfjaijclkajfdlkadjfkl123214vsdff"
  console.log('got uid from headers: ', uid);

  return (
    <div>
        <h1 className='text-2xl mx-auto mt-5'>Home Page</h1>
        <Landing uid={uid!}/>
    </div>
  )
}
