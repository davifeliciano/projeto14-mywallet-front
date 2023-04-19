import { useState } from "react";
import { Link, useNavigation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormContainer from "../components/FormContainer";
import Form from "../components/Form";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import SubmitLoader from "../components/SubmitLoader";

export async function action({ request }) {
  // Simulando uma requisição POST à API
  const formData = await request.formData();
  const { email, password, passwordConfirm } = Object.fromEntries(formData);

  if (password !== passwordConfirm) {
    toast("As senhas não correspondem! Tente novamente.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return null;
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log({ email, password });
  // Erro para teste da ErrorPage
  throw new Error("Mensagem de erro de teste");
}

export default function Cadastro() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <h1>MyWallet</h1>
        <Form method="post">
          <Input
            required
            type="email"
            name="email"
            placeholder="email"
            disabled={navigation.state === "submitting"}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            required
            minLength={8}
            type="password"
            name="password"
            placeholder="senha"
            disabled={navigation.state === "submitting"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Input
            required
            minLength={8}
            type="password"
            name="passwordConfirm"
            placeholder="senha"
            disabled={navigation.state === "submitting"}
            value={form.passwordConfirm}
            onChange={(e) =>
              setForm({ ...form, passwordConfirm: e.target.value })
            }
          />
          <SubmitButton
            type="submit"
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? <SubmitLoader /> : "Cadastrar"}
          </SubmitButton>
        </Form>
        <Link to="/">Já tem uma conta? Entre agora!</Link>
      </FormContainer>
    </>
  );
}
