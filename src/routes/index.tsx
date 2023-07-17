import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import Login from '../pages/Login';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <RequireAuth>
            {/* <Layout /> */}
            <></>
          </RequireAuth>
        }
      >
        <Route index element={<></>} />
        {/* Conteúdo da home, outras páginas com o mesmo layout podem ser inseridas aqui */}
      </Route>
      <Route path="login" element={<Login />} />
    </>,
  ),
);
