import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Contacts from "./pages/Contacts";
import Delivery from "./pages/Delivery";
import AdminEnter from "./pages/AdminEnter";
import AdminChoice from "./pages/AdminChoice";
import AdminAdd from "./pages/AdminAdd";
import AdminRed from "./pages/AdminRed";
import AdminDel from "./pages/AdminDel";
import AdminOut from "./pages/AdminOut";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="catalog/:category?" element={<Catalog />} />
      <Route path="delivery" element={<Delivery />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="cart" element={<Cart />} />
      <Route path="admin_enter" element={<AdminEnter />} />
      <Route path="admin_out" element={<AdminOut />} />
      <Route path="admin_choice" element={<AdminChoice />} />
      <Route path="admin_add" element={<AdminAdd />} />
      <Route path="admin_red" element={<AdminRed />} />
      <Route path="admin_del" element={<AdminDel />} />
    </Route>,
  ),
);

export default router;
