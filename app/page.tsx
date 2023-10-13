import Image from 'next/image'
import Navbar from './_components/Navbar'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <>
    
      <Navbar />
      <UserButton afterSignOutUrl='/' />
    </>
    
  )
}
