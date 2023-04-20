import dayjs from "dayjs";
import styled from "styled-components";
import brlFormater from "../utils/brlFormater";

export default function Record({ date, description, amount }) {
  return (
    <Container>
      <RecordDate>{dayjs(date).format("DD/MM")}</RecordDate>
      <RecordDescription>{description}</RecordDescription>
      <RecordAmount amount={amount}>{brlFormater.format(amount)}</RecordAmount>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.6rem;
`;

const RecordDate = styled.span`
  color: #c6c6c6;
`;

const RecordDescription = styled.span`
  flex: 1;
`;

const RecordAmount = styled.span`
  color: ${(props) => (props.amount >= 0 ? "#03ac00" : "#c70000")};
`;
