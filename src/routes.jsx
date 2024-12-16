import { createBrowserRouter } from 'react-router-dom';

import Layout from './layout';
import HomePage from './pages/home/HomePage';
// import AboutPage from './pages/about/AboutPage';
import CategoryPage from './pages/category/CategoryPage';
import NotFound from './pages/notFound/404';
import Forbidden403 from './pages/notFound/403';
import InternalServerError500 from './pages/notFound/500';
import ArticlePage from "./pages/article/ArticlePage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/about',
                element: <h2>About</h2>,
            },
            {
                path: '/article/:key/:id',
                element: <ArticlePage />,
            },
            {
                path: '/category/:key',
                element: <CategoryPage />,
            },
            {
                path: '/403',
                element: <Forbidden403 />,
            },
            {
                path: '/500',
                element: <InternalServerError500 />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ]
    }
]);

export default router;
