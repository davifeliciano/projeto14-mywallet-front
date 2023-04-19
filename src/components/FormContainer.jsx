import styled from "styled-components";

const FormContainer = styled.div`
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

  && a {
    color: white;
    font-size: 1.4rem;
  }
`;

export default FormContainer;
