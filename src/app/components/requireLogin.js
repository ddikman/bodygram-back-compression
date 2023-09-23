import { redirect } from 'next/navigation'
import { useContext } from "react"
import { AuthContext } from "../state/auth"

export default function RequireLogin({children}) {
  const { isLoggedIn } = useContext(AuthContext)
  if (!isLoggedIn) {
    redirect('/')
  }
  return children
}