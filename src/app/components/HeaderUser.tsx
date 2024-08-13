
import React from 'react'
import Link from 'next/link'

import { auth, signOut } from "../../../auth"
import Image from "next/image"
import SignOutButton from './SignOutButton'

export default async function HeaderUser () {
    const session = await auth()

  return (
    <div>        
        <div className='w-60 flex justify-end'> 
            { !session && 
              <div className='w-full flex justify-around'>
                <div className='text-violet-50'><Link href="/api/auth/signin">Login</Link></div>   
                <div className='text-violet-500'>Register</div> 
              </div>
            }      
            {session && 
              <Link href="/profile">
                <div className='w-32 flex flex-col items-center justify-around'>

                  <Image src={session.user.image} alt="user-image" width={50} height={50} style={{ borderRadius: "50%"}}/>
                  <div className='flex items-center text-slate-100'>{session.user.name}</div>
                  <SignOutButton signOut={async () => {
                    "use server"
                    signOut()
                  }}/>
                </div>
              </Link>}
        </div>
    </div>
  )
}

