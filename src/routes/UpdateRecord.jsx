import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import {
  redirect,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import SessionContext from "../contexts/SessionContext";
import parseAmount from "../utils/parseAmount";
import { getToken } from "../utils/sessionUtils";
import Toast from "../components/Toast";
import RecordFormContainer from "../components/RecordFormContainer";
import RecordForm from "../components/RecordForm";

export async function action({ params, request }) {
  const formData = await request.formData();
  const { description, amount } = Object.fromEntries(formData);
  const { id } = params;
  const parsedAmount = parseAmount(amount);
  const token = getToken();
  const config = { headers: { authorization: `Bearer ${token}` } };

  try {
    await axios.patch(
      `/transactions/${id}`,
      { description, amount: parsedAmount },
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

export default function UpdateRecord() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const { session } = useContext(SessionContext);
  const [amount, setAmount] = useState(location.state?.amount);
  const [description, setDescription] = useState(location.state?.description);
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  const availableTypeTexts = { credit: "entrada", debit: "saída" };
  const typeText = availableTypeTexts[location.state?.type];

  useEffect(() => {
    if (!session) navigate("/?reason=denied");
  }, []);

  return (
    <>
      <Toast />
      <Container>
        <RecordFormContainer>
          <div>
            <h1>Editar {typeText}</h1>
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
