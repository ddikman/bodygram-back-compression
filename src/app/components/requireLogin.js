import { redirect, useRouter } from 'next/navigation'
import { useContext, useEffect } from "react"
import { AuthContext } from "../state/auth"

export default function RequireLogin({children}) {
  const { isLoggedIn } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
     router.replace('/')
    }
  }, [isLoggedIn, router])

  return children
}