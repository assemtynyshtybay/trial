import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./App";
import { HOME, NEWS, NEWS_DETAIL, PRODUCT, PRODUCTS } from "./utils/variables";
import ProductsPage from "./pages/ProductsPage";
import NewsPage from "./pages/NewsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NewsDetailPage from "./pages/NewsDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: HOME,
        element: <HomePage />,
      },
      {
        path: PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: NEWS,
        element: <NewsPage />,
      },
      {
        path: NEWS_DETAIL,
        element: <NewsDetailPage />,
      },
      {
        path: PRODUCT,
        element: <ProductsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
