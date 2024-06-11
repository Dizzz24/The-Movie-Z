import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import MainLayout from './pages/MainLayout';
import Home from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoriteMovie from './pages/FavoritePage';
import EditPage from './pages/EditPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        loader: () => {
            if (!localStorage.access_token) {
                return redirect('/login')
            }
            return null
        },
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/detail',
                element: <DetailPage />
            },
            {
                path: '/edit',
                element: <EditPage />
            },
            {
                path: '/favorites',
                element: <FavoriteMovie />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
        loader: () => {
            if (localStorage.access_token) {
                return redirect('/')
            }
            return null
        }
    },
    {
        path: '/register',
        element: <Register />,
        loader: () => {
            if (localStorage.access_token) {
                return redirect('/')
            }
            return null
        }
    }
]);

export default router;