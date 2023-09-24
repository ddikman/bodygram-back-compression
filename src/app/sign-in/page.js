'use client'

import { useContext, useState } from "react";
import { AuthContext } from "../state/auth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { setEmail } = useContext(AuthContext)
  const [ loginEmail, setLoginEmail ] = useState('')
  const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('setting email to', loginEmail)
    setEmail(loginEmail)
    router.push('/home')
  }

  return (<div>
      <h1>Sign In</h1>
      <p className="my-4">
        Note: <br/>
        This app is just a prototype. Your email acts as a way to identify you but it is in no way secure.
      </p>
      <form onSubmit={onSubmit}>
        <label>
          Your email:
        </label>
        <input className="w-full" type="email" onChange={(e) => setLoginEmail(e.target.value)} />
        <input className="my-4 w-full" type="submit" value="Continue" />
      </form>
    </div>
  )
}