import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Login, { action as loginAction } from "./routes/Login";
import Cadastro, { action as cadastroAction } from "./routes/Cadastro";
import Home, { loader as homeLoader } from "./routes/Home";
import NewRecord, { creditAction, debitAction } from "./routes/NewRecord";
import GlobalStyle from "./styles/GlobalStyle";
import SessionContext from "./contexts/SessionContext";
import RecordsContext from "./contexts/RecordsContext";

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
    element: <NewRecord type="entrada" />,
    errorElement: <ErrorPage />,
    action: creditAction,
  },
  {
    path: "/nova-transacao/saida",
    element: <NewRecord type="saida" />,
    errorElement: <ErrorPage />,
    action: debitAction,
  },
]);

export default function App() {
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("session"))
  );
  const [records, setRecords] = useState([]);

  return (
    <>
      <GlobalStyle />
      <SessionContext.Provider value={{ session, setSession }}>
        <RecordsContext.Provider value={{ records, setRecords }}>
          <RouterProvider router={router} />
        </RecordsContext.Provider>
      </SessionContext.Provider>
    </>
  );
}
