import { useContext, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useActionData,
  useNavigation,
} from "react-router-dom";
import SessionContext from "../contexts/SessionContext";
import FormContainer from "../components/FormContainer";
import Form from "../components/Form";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import SubmitLoader from "../components/SubmitLoader";
import getFakeSession from "../utils/getFakeSession";

export async function action({ request }) {
  // Simulando uma requisição POST à API
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  console.table(body);
  const delay = 1000;
  const session = await getFakeSession(delay);
  return session;
}

export default function Login() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const { session, setSession } = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  useEffect(() => {
    if (actionData) {
      setSession(actionData);
      localStorage.setItem("session", JSON.stringify(actionData));
      navigate("/home");
    }
  }, [actionData]);

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
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          minLength={8}
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
  );
}
