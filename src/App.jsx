import axios from "axios";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Login, { action as loginAction } from "./routes/Login";
import Cadastro, { action as cadastroAction } from "./routes/Cadastro";
import Home, { loader as homeLoader } from "./routes/Home";
import NewRecord, { creditAction, debitAction } from "./routes/NewRecord";
import GlobalStyle from "./styles/GlobalStyle";
import { getSession } from "./utils/sessionUtils";
import SessionContext from "./contexts/SessionContext";

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
    element: <NewRecord type="debt" />,
    errorElement: <ErrorPage />,
    action: debitAction,
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
