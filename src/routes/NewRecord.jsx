import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { redirect, useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import SessionContext from "../contexts/SessionContext";
import recordSchema from "../schemas/recordSchema";
import parseAmount from "../utils/parseAmount";
import { getToken } from "../utils/sessionUtils";
import Toast from "../components/Toast";
import RecordFormContainer from "../components/RecordFormContainer";
import RecordForm from "../components/RecordForm";

async function action(request, type) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  const { error, value } = recordSchema.validate(form);

  if (error) {
    toast("Formato inválido. Todos os campos são obrigatórios.");
    return null;
  }

  const { amount, description } = value;
  const parsedAmount = parseAmount(amount);
  const token = getToken();
  const config = { headers: { authorization: `Bearer ${token}` } };

  try {
    await axios.post(
      "/transactions",
      { description, amount: parsedAmount, type },
      config
    );
    return redirect("/home");
  } catch (err) {
    switch (err.response.status) {
      case 422:
        toast("Formato inválido. Todos os campos são obrigatórios.");
        break;

      case 401:
        throw err;
        break;

      default:
        console.error(err);
        toast("Ocorreu um erro inesperado. Tente novamente.");
        break;
    }

    return null;
  }
}

export async function creditAction({ request }) {
  return action(request, "credit");
}

export async function debitAction({ request }) {
  return action(request, "debit");
}

export default function NewRecord({ type }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { session } = useContext(SessionContext);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  const availableTypeTexts = { credit: "entrada", debit: "saída" };
  const typeText = availableTypeTexts[type];

  useEffect(() => {
    if (!session) navigate("/?reason=denied");
  }, []);

  return (
    <>
      <Toast />
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
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
