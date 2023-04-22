import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import { removeSession } from "../utils/sessionUtils";
import SessionContext from "../contexts/SessionContext";

export default function RecordsError() {
  const navigate = useNavigate();
  const { setSession } = useContext(SessionContext);
  const error = useAsyncError();

  useEffect(() => {
    if (error.response.status === 401) {
      setSession(null);
      removeSession();
      navigate("/?reason=expired");
    }
  }, []);

  return (
    <Container>
      <h2>MyWallet</h2>
      <p>Ocorreu um erro inesperado.</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  & h2 {
    font-family: "Saira Stencil One", cursive;
    font-size: 3.2rem;
    font-weight: 400;
    user-select: none;
    -webkit-user-drag: none;
  }

  & p {
    font-size: 1.4rem;
  }
`;
