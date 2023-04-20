import styled from "styled-components";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import SessionContext from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);

  function logout() {
    setSession(null);
    localStorage.removeItem("session");
    navigate("/");
  }

  return (
    <HeaderContainer>
      <h1>{session && `Olá, ${session.nome}`}</h1>
      <button onClick={logout}>
        <FiLogOut />
      </button>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h1 {
    font-size: 2.6rem;
    color: white;
  }

  & button {
    height: 100%;
    background-color: transparent;
    border: none;
    color: white;
  }

  & button svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;
