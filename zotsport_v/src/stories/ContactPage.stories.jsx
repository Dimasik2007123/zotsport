import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contacts from "../pages/Contacts";

const AppWrapper = () => (
  <CartProvider>
    <div>
      <Header />
      <Contacts />
      <Footer />
    </div>
  </CartProvider>
);

export default {
  title: "Pages/ContactPage",
  component: AppWrapper,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
    },
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <MemoryRouter initialEntries={["/contacts"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
