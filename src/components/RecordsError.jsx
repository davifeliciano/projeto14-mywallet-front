import { useContext, useEffect } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import { removeSession } from "../utils/sessionUtils";
import SessionContext from "../contexts/SessionContext";
import RecordsMessage from "./RecordsMessage";

export default function RecordsError() {
  const navigate = useNavigate();
  const { setSession } = useContext(SessionContext);
  const error = useAsyncError();

  useEffect(() => {
    if (error.response?.status === 401) {
      setSession(null);
      removeSession();
      navigate("/?reason=expired");
    }
  }, []);

  return <RecordsMessage message="Ocorreu um erro inesperado." />;
}
