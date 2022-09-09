import { useRoutes } from "react-router-dom";
import { Home } from "../pages/home";
import { Receitas } from '../pages/receitas/receitas'
import { Users } from '../pages/users'
import { Iptu } from "../pages/receitas/iptu/iptu";
import { AddUserType } from "../Api";
import { NewLogin } from "../pages/login/login";

type PropsMain = {
  user: AddUserType;
}

export const MainRoute = ({ user }: PropsMain) => {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/home', element: <Home /> },
    { path: '/receitas', element: <Receitas /> },
    { path: '/receitas/iptu', element: <Iptu user={user} /> },
    { path: '/usuarios', element: <Users user={user} /> },
    { path: '*', element: <Home /> },
  ])
}

type Props = {
  newUser: (user: AddUserType) => void;
}

export const LoginRouter = ({ newUser }: Props) => {
  return useRoutes([
    {
      path: '*', element: <NewLogin
        newUser={newUser}
      />
    },
  ])
}