import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import SessionContext from "../contexts/SessionContext";
import signInSchema from "../schemas/signInSchema";
import { storeSession } from "../utils/sessionUtils";
import Toast from "../components/Toast";
import FormContainer from "../components/FormContainer";
import Form from "../components/Form";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import SubmitLoader from "../components/SubmitLoader";

export async function action({ request }) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  const { error, value } = signInSchema.validate(form);

  if (error) {
    toast(
      "Formato inválido. Verifique se o email é válido e se a senha tem 8 caracteres ou mais. Todos os campos são obrigatórios."
    );
    return null;
  }

  const body = value;

  try {
    const { data } = await axios.post("/auth/sign-in", body);
    return data;
  } catch (err) {
    switch (err.response.status) {
      case 422:
        toast(
          "Formato inválido. Verifique se o email é válido e se a senha tem 8 caracteres ou mais. Todos os campos são obrigatórios."
        );
        break;

      case 401:
        toast("Usuário ou senha incorretos. Tente novamente.");
        break;

      default:
        console.error(err);
        toast("Ocorreu um erro inesperado. Tente novamente.");
        break;
    }

    return null;
  }
}

export default function Login() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const [searchParams, setSearchParams] = useSearchParams();
  const reason = searchParams.get("reason");
  const { session, setSession } = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  useEffect(() => {
    if (actionData) {
      setSession(actionData);
      storeSession(actionData);
      navigate("/home");
    }
  }, [actionData]);

  useEffect(() => {
    if (session) navigate("/home");

    switch (reason) {
      case "expired":
        toast("Sua sessão expirou! Faça login novamente.");
        break;

      case "newuser":
        toast("Usuário criado com sucesso! Faça login.");
        break;

      case "denied":
        toast("É necessário fazer login para acessar essa página.");
        break;

      default:
        break;
    }
  }, [session]);

  return (
    <>
      <Toast />
      <FormContainer>
        <h1>MyWallet</h1>
        <Form method="post">
          <Input
            required
            type="email"
            name="email"
            placeholder="email"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="senha"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <SubmitLoader /> : "Entrar"}
          </SubmitButton>
        </Form>
        <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
      </FormContainer>
    </>
  );
}
