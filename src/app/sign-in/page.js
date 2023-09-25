'use client'

import { useContext, useState } from "react";
import { AuthContext } from "../state/auth";
import { useRouter } from "next/navigation";
import PageContainer from "../components/pageContainer";

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

  return <PageContainer title="Sign In">
      <form onSubmit={onSubmit} className="flex flex-1 flex-col w-full">
        <label>
          Your email:
        </label>
        <input className="w-full" type="email" onChange={(e) => setLoginEmail(e.target.value)} value={loginEmail} />
        <div className="py-4">
          <p>* The email is only used to separate accounts.</p>
          <p>* No password is used so anyone can enter any email.</p>
          <p>* To just see how the UI works, you can use <span class="link" onClick={() => setLoginEmail('test@straighten.app')}>test@straighten.app</span>.</p>
        </div>
        <div className="flex flex-1 flex-col justify-end">
          <input className="w-full" type="submit" value="Continue" />
        </div>
      </form>
    </PageContainer>
}