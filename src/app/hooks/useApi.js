import { useContext, useMemo } from "react";
import { AuthContext } from "../state/auth";
import { ApiClient } from "../services/apiClient";

export default function useApi() {
  const { email } = useContext(AuthContext);
  return useMemo(() => new ApiClient(email), [email]);
}