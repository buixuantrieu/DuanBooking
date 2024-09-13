import { useNavigate } from "react-router-dom";
import { ROUTES } from "@constants/routes";

export function useLoginPageNavigate() {
  const navigate = useNavigate();
  return () => navigate(ROUTES.AUTH);
}
