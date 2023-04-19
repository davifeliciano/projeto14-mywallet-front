import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Login, { action as loginAction } from "./routes/Login";
import Cadastro, { action as cadastroAction } from "./routes/Cadastro";
import GlobalStyle from "./styles/GlobalStyle";
import SessionContext from "./contexts/SessionContext";

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
]);

export default function App() {
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("session"))
  );

  return (
    <>
      <GlobalStyle />
      <SessionContext.Provider value={{ session, setSession }}>
        <RouterProvider router={router} />
      </SessionContext.Provider>
    </>
  );
}
