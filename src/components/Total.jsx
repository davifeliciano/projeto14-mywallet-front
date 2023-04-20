import styled from "styled-components";
import brlFormater from "../utils/brlFormater";

export default function Total({ amount }) {
  return (
    <Container>
      <TotalText>Total</TotalText>
      <TotalAmount amount={amount}>{brlFormater.format(amount)}</TotalAmount>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.6rem;
  font-size: 1.7rem;
`;

const TotalText = styled.span`
  font-weight: 700;
  text-transform: uppercase;
`;

const TotalAmount = styled.span`
  color: ${(props) => (props.amount >= 0 ? "#03ac00" : "#c70000")};
`;

export { Container, TotalText };
