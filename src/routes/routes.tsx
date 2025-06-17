import { Layout } from "../components/ layout/layout";
import { Home } from "../pages/home/home";
import { NotFound } from "../pages/not-found/not-found";
import { createBrowserRouter } from "react-router-dom";
import { TicTacToe } from "../pages/tic-tac-toe/tic-tac-toe";
import SetupPage from "../pages/darts-setup/setup";
import { Darts } from "../pages/darts-game/darts-game";
import { BaldaMainPage } from "../pages/balda-main/balda-main";
import { BaldaSetup } from "../pages/balda-setup/balda-setup";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: < NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tic-tac-toe",
        element: <TicTacToe />
      },
      {
        path: "darts-setup",
        element: <SetupPage />
      },
      {
        path: "darts",
        element: <Darts/>
      },
      {
        path: 'balda-main',
        element: <BaldaMainPage/>
      },
      {
        path: 'balda-setup',
        element: <BaldaSetup/>
      }

    ],
  },
]);
