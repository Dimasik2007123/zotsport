import Header from "../components/Header";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default {
  title: "Layout/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <MemoryRouter>
        <CartContext.Provider value={{ cart: { 1: {}, 2: {} } }}>
          {" "}
          {}
          <Story />
        </CartContext.Provider>
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
