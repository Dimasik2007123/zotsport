import AdminDel from "../pages/AdminDel";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";

export default {
  title: "Admin/AdminDel",
  component: AdminDel,
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <MemoryRouter>
        <CartProvider>
          <Story />
        </CartProvider>
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
