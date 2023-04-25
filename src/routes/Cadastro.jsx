import axios from "axios";
import { useState } from "react";
import { Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import signUpSchema from "../schemas/signUpSchema";
import Toast from "../components/Toast";
import FormContainer from "../components/FormContainer";
import Form from "../components/Form";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import SubmitLoader from "../components/SubmitLoader";

export async function action({ request }) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  const { error, value } = signUpSchema.validate(form);

  if (error) {
    toast(
      "Formato inválido. Verifique se o email é válido e se a senha tem 8 caracteres ou mais. Todos os campos são obrigatórios."
    );
    return null;
  }

  const { name, email, password, passwordConfirm } = value;

  if (password !== passwordConfirm) {
    toast("As senhas não correspondem! Tente novamente.");
    return null;
  }

  try {
    await axios.post("/auth/sign-up", { name, email, password });
    return redirect("/?reason=newuser");
  } catch (err) {
    switch (err.response.status) {
      case 422:
        toast(
          "Formato inválido. Verifique se o email é válido e se a senha tem 8 caracteres ou mais. Todos os campos são obrigatórios."
        );
        break;

      case 409:
        toast("Já existe um usuário com esse email.");
        break;

      default:
        console.error(err);
        toast("Ocorreu um erro inesperado. Tente novamente.");
        break;
    }

    return null;
  }
}

export default function Cadastro() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  return (
    <>
      <Toast />
      <FormContainer>
        <h1>MyWallet</h1>
        <Form method="post">
          <Input
            type="text"
            name="name"
            placeholder="name"
            disabled={navigation.state === "submitting"}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            type="email"
            name="email"
            placeholder="email"
            disabled={navigation.state === "submitting"}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            name="password"
            placeholder="senha"
            disabled={navigation.state === "submitting"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="confirme a senha"
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
