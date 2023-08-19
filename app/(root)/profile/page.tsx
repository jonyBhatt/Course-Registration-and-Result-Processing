import { ProfileComponent } from '@/components/shared'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Page = async() => {
  const session: any | null = await getServerSession(authOptions);
  // console.log(session.user);
  
  return (
    <div className='container mx-auto'>
      <h1 className='head-text'>Profile</h1>
      <ProfileComponent user={session?.user} />
    </div>
  )
}

export default Page