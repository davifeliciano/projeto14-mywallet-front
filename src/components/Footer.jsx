import styled from "styled-components";
import { SlPlus, SlMinus } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterLink to="/nova-transacao/entrada">
        <SlPlus />
        Nova entrada
      </FooterLink>
      <FooterLink to="/nova-transacao/saida">
        <SlMinus />
        Nova saída
      </FooterLink>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  gap: 1.5rem;
  min-height: 12rem;
`;

const FooterLink = styled(Link)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  background-color: #a328d6;
  border: none;
  border-radius: 5px;
  font-size: 1.7rem;
  font-weight: 700;

  && {
    color: white;
  }

  &:active {
    background-color: rgb(163, 40, 214, 0.7);
    transition: background-color 200ms ease;
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;
