import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";

const AppWrapper = () => (
  <CartProvider>
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  </CartProvider>
);

export default {
  title: "Pages/HomePage",
  component: AppWrapper,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
