import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Home } from '../pages/home';
import { Detail } from '../pages/detail';
import { Cart } from '../pages/cart';
import { Payment } from '../pages/payment';
import { Login } from '../pages/login';
import { Register } from '../pages/register';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/detail/:id',
        element: <Detail />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export { router };
