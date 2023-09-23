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
      <h2>Set your email</h2>
      <form onSubmit={onSubmit}>
        <label>
          Email
        </label>
        <input type="email" onChange={(e) => setLoginEmail(e.target.value)} />
        <input type="submit" value="Start" />
      </form>
    </div>
  )
}