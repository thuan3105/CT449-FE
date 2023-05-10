import { createRouter, createWebHistory } from "vue-router";
import CartPage from "../views/CartPage";
import ProductsPage from "../views/ProductsPage";
import ProductsDetail from "../views/ProductDetailPage";
import NotFound from "../views/NotFound";
import LoginPage from "../views/LoginPage";
import SignupPage from "../views/SignupPage";
import CheckoutPage from "../components/CheckoutPage";
import OrderPage from "../components/OrderPage";
import SearchPage from "../views/SearchPage";
import AdminManagers from "../views/AdminManagers";
const routes = [
  {
    path: "/products",
    name: "Products",
    component: ProductsPage,
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: ProductsDetail,
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "SignupPage",
    component: SignupPage,
  },
  {
    path: "/admin",
    name: "AdminManagers",
    component: AdminManagers,
  },
  {
    path: "/search/:searchTerm",
    name: "SearchPage",
    component: SearchPage,
    props: true,
  },

  {
    path: "/",
    redirect: "products",
  },
  {
    path: "/checkout",
    name: "CheckoutPage",
    component: CheckoutPage,
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
  },
  {
    path: "/order",
    name: "OrderPage",
    component: OrderPage,
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
