import axios from "axios";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Login, { action as loginAction } from "./routes/Login";
import Cadastro, { action as cadastroAction } from "./routes/Cadastro";
import Home, { loader as homeLoader } from "./routes/Home";
import NewRecord, { creditAction, debitAction } from "./routes/NewRecord";
import { action as deleteAction } from "./routes/DeleteRecord";
import { action as updateAction } from "./routes/UpdateRecord";
import GlobalStyle from "./styles/GlobalStyle";
import { getSession } from "./utils/sessionUtils";
import SessionContext from "./contexts/SessionContext";
import UpdateRecord from "./routes/UpdateRecord";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
    errorElement: <ErrorPage />,
    action: cadastroAction,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: homeLoader,
  },
  {
    path: "/nova-transacao/entrada",
    element: <NewRecord type="credit" />,
    errorElement: <ErrorPage />,
    action: creditAction,
  },
  {
    path: "/nova-transacao/saida",
    element: <NewRecord type="debit" />,
    errorElement: <ErrorPage />,
    action: debitAction,
  },
  {
    path: "/transacao/:id",
    element: <UpdateRecord />,
    action: updateAction,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/transacao/:id/deletar",
        action: deleteAction,
      },
    ],
  },
]);

export default function App() {
  const [session, setSession] = useState(getSession());

  return (
    <>
      <GlobalStyle />
      <SessionContext.Provider value={{ session, setSession }}>
        <RouterProvider router={router} />
      </SessionContext.Provider>
    </>
  );
}
