import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { removeSession } from "./utils/sessionUtils";
import SessionContext from "./contexts/SessionContext";

export default function ErrorPage() {
  const navigate = useNavigate();
  const { setSession } = useContext(SessionContext);
  const error = useRouteError();

  useEffect(() => {
    if (error.response?.status === 401) {
      setSession(null);
      removeSession();
      navigate("/?reason=expired");
    }
  }, []);

  return (
    <Container>
      <h1>MyWallet</h1>
      <p>Um erro inesperado aconteceu.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-block: 8rem;

  & h1 {
    font-family: "Saira Stencil One", cursive;
    font-size: 3.2rem;
    font-weight: 400;
    color: white;
    user-select: none;
    -webkit-user-drag: none;
  }

  & p {
    color: white;
    font-size: 1.4rem;
  }
`;
