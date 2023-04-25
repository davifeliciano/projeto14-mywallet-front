import dayjs from "dayjs";
import styled from "styled-components";
import { Form, Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import brlFormater from "../utils/brlFormater";

export default function Record({ id, date, description, amount, type }) {
  const formattedAmount = brlFormater.format(amount);
  return (
    <Container>
      <RecordDate>{dayjs(date).format("DD/MM")}</RecordDate>
      <RecordDescription>
        <Link
          to={`/transacao/${id}`}
          state={{ description, amount: formattedAmount, type }}
        >
          {description}
        </Link>
      </RecordDescription>
      <RecordAmount type={type}>{formattedAmount}</RecordAmount>
      <Form
        method="post"
        action={`/transacao/${id}/deletar`}
        onSubmit={(e) =>
          !window.confirm("Tem certeza que deseja excluir esse registro?") &&
          e.preventDefault()
        }
      >
        <DeleteButton type="submit">
          <AiOutlineDelete />
        </DeleteButton>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
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
  color: ${(props) =>
    props.type === "credit"
      ? "#03ac00"
      : props.type === "debit"
      ? "#c70000"
      : ""};
`;

const DeleteButton = styled.button`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: transparent;
  border: none;

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;
