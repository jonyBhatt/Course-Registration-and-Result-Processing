import React from 'react'
interface SessionProps{
    user:object
}
const ProfileComponent = (user: SessionProps) => {
    console.log(user);
    
  return (
    <div>ProfileComponent</div>
  )
}

export default ProfileComponent