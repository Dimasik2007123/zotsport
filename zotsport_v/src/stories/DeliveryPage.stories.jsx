import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Delivery from "../pages/Delivery";

const AppWrapper = () => (
  <CartProvider>
    <div>
      <Header />
      <Delivery />
      <Footer />
    </div>
  </CartProvider>
);

export default {
  title: "Pages/DeliveryPage",
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
      <MemoryRouter initialEntries={["/delivery"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
