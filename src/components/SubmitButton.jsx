import styled from "styled-components";

const SubmitButton = styled.button`
  width: 100%;
  height: 4.5rem;
  color: white;
  background-color: rgb(163, 40, 214);
  border: none;
  border-radius: 5px;
  font-size: 2rem;
  transition: background-color 200ms ease;

  &:active {
    background-color: rgb(163, 40, 214, 0.7);
    transition: background-color 200ms ease;
  }

  &:disabled {
    opacity: 70%;
  }

  & svg {
    margin: auto;
  }
`;

export default SubmitButton;
