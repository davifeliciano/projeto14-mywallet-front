import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import SessionContext from "../contexts/SessionContext";
import FormContainer from "../components/FormContainer";
import Form from "../components/Form";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import SubmitLoader from "../components/SubmitLoader";

export async function action({ request }) {
  // Simulando uma requisição POST à API
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(body);
  // Erro para teste da ErrorPage
  throw new Error("Mensagem de erro de teste");
}

export default function Login() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { session, setSession } = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) navigate("/home");
  }, [session]);

  return (
    <FormContainer>
      <h1>MyWallet</h1>
      <Form method="post">
        <Input
          required
          type="email"
          name="email"
          placeholder="email"
          disabled={navigation.state === "submitting"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          minLength={8}
          type="password"
          name="password"
          placeholder="senha"
          disabled={navigation.state === "submitting"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton
          type="submit"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? <SubmitLoader /> : "Entrar"}
        </SubmitButton>
      </Form>
      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </FormContainer>
  );
}
