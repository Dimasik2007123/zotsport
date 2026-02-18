import AdminOut from "../pages/AdminOut";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default {
  title: "Admin/AdminOut",
  component: AdminOut,
  parameters: { layout: "centered" },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <MemoryRouter>
        <CartContext.Provider value={{ logOut: () => alert("Logged out") }}>
          <Story />
        </CartContext.Provider>
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
