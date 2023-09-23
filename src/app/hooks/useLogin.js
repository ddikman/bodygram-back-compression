import { AuthContext } from "../state/auth";


export function useLogin() {
  const auth = useContext(AuthContext)
  if (!auth.isLoggedIn) {
    redirect('/')
  }

  return auth
}