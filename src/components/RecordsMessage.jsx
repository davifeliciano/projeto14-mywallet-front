import styled from "styled-components";

export default function RecordsMessage({ message }) {
  return (
    <Container>
      <h2>MyWallet</h2>
      <p>{message}</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #a328d6;

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
