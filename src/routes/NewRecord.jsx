import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { redirect, useNavigate, useNavigation } from "react-router-dom";
import SessionContext from "../contexts/SessionContext";
import RecordFormContainer from "../components/RecordFormContainer";
import RecordForm from "../components/RecordForm";

async function getFormDataObject(request) {
  const formData = await request.formData();
  return Object.fromEntries(formData);
}

function parseAmount(amount) {
  return parseFloat(amount.replace("R$ ", "").replace(",", "."));
}

export async function creditAction({ request }) {
  const { amount, description } = await getFormDataObject(request);
  const parsedAmount = parseAmount(amount);
  const body = { amount: parsedAmount, description };
  console.table(body);
  return redirect("/home");
}

export async function debitAction({ request }) {
  const { amount, description } = await getFormDataObject(request);
  const parsedAmount = -parseAmount(amount);
  const body = { amount: parsedAmount, description };
  console.table(body);
  return redirect("/home");
}

export default function NewRecord({ type }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { session } = useContext(SessionContext);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";
  const typeText = type === "saida" ? "saída" : type;

  useEffect(() => {
    if (!session) navigate("/");
  }, [session]);

  return (
    <Container>
      <RecordFormContainer>
        <div>
          <h1>Nova {typeText}</h1>
        </div>
        <RecordForm
          amount={amount}
          setAmount={setAmount}
          description={description}
          setDescription={setDescription}
          submitButtonText={`Salvar ${typeText}`}
          disabled={isLoading}
        />
      </RecordFormContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
