import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../pages/Cart";

const mockProductsData = [
  {
    id: 1,
    name: "Adidas Predator Elite",
    image: "https://picsum.photos/id/1015/200",
    price: 12990,
    old_price: 15990,
    sale: 19,
  },
  {
    id: 2,
    name: "Nike Mercurial Vapor",
    image: "https://picsum.photos/id/1025/200",
    price: 14990,
    old_price: 17990,
    sale: 17,
  },
  {
    id: 3,
    name: "Nike Ultra Ultimate",
    image: "https://picsum.photos/id/1040/200",
    price: 11990,
    old_price: 0,
    sale: 0,
  },
];

const mockFullCart = {
  1: 2,
  2: 1,
  3: 3,
};

export default {
  title: "Pages/CartPage",
  component: Cart,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => {
      const originalFetch = window.fetch;
      window.fetch = async (url) => {
        if (url.includes("/backend/start.php")) {
          return {
            ok: true,
            json: async () => mockProductsData,
          };
        }
        return originalFetch(url);
      };

      return (
        <MemoryRouter>
          <CartContext.Provider
            value={{
              cart: mockFullCart,
              deleteFromCart: (id) => alert(`Удалён товар ${id}`),
            }}
          >
            <Header />
            <Story />
            <Footer />
          </CartContext.Provider>
        </MemoryRouter>
      );
    },
  ],
};

export const Default = {};
