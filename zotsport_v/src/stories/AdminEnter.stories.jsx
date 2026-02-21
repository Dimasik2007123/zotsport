import AdminEnter from "../pages/AdminEnter";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const mockLogIn = () => {
  console.log("logIn called");
};

const originalGetItem = window.localStorage.getItem;

window.localStorage.getItem = function (key) {
  if (key === "adm") return null;
  return originalGetItem.call(this, key);
};

export default {
  title: "Admin/AdminEnter",
  component: AdminEnter,
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <MemoryRouter>
        <CartContext.Provider value={{ logIn: mockLogIn }}>
          <Story />
        </CartContext.Provider>
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
