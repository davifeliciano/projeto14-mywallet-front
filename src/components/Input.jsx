import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 4.5rem;
  padding-inline: 1rem;
  border: none;
  border-radius: 5px;
  font-size: 2rem;

  &:focus {
    transition: outline 200ms ease;
    outline: 4px solid #a328d6;
  }

  &:disabled {
    color: #afafaf;
    background-color: #d2d2d2;
  }
`;

export default Input;
