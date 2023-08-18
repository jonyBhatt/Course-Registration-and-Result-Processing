import React from 'react'
import { signOut } from 'next-auth/react'
import {GoSignOut} from 'react-icons/go'
import { Button } from '../ui/button'
const SignOut = () => {
  return (
      <Button onClick={() => signOut()}>
          <GoSignOut size="25px" className="text-white" />
          SignOut</Button>
  )
}

export default SignOut