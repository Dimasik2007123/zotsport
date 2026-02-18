/* eslint-disable no-unused-vars */
import Header from "../components/Header";
import Footer from "../components/Footer";
import Catalog from "../pages/Catalog";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const mockBootsProducts = [
  {
    id: 1,
    name: "Adidas Predator",
    image: "https://picsum.photos/id/1015/200",
    price: 12990,
    old_price: 15990,
    sale: 19,
    avalible: 1,
    category: "Бутсы",
    brand: "Adidas",
  },
  {
    id: 2,
    name: "Nike Mercurial",
    image: "https://picsum.photos/id/1025/200",
    price: 14990,
    old_price: 17990,
    sale: 17,
    avalible: 1,
    category: "Бутсы",
    brand: "Nike",
  },
  {
    id: 3,
    name: "Nike Ultra",
    image: "https://picsum.photos/id/1040/200",
    price: 11990,
    old_price: 0,
    sale: 0,
    avalible: 1,
    category: "Бутсы",
    brand: "Nike",
  },
];

const mockFoodProducts = [
  {
    id: 10,
    name: "Протеин Optimum",
    image: "https://picsum.photos/id/1005/200",
    price: 3490,
    avalible: 1,
    category: "Спортивное питание",
    brand: "Optimum",
  },
];

export default {
  title: "Pages/CatalogPage",
  component: Catalog,
  parameters: {
    layout: "fullscreen",
  },
};

export const BootsWithFilters = {
  decorators: [
    (Story) => {
      const originalFetch = window.fetch;
      window.fetch = async (input) => {
        const url = typeof input === "string" ? input : input.url;
        if (url?.includes("/backend/start.php")) {
          return {
            ok: true,
            json: async () => mockBootsProducts,
          };
        }
        return originalFetch(input);
      };

      return (
        <CartContext.Provider
          value={{
            cart: { 1: {}, 2: {} },
            addToCart: (id) => console.log(`Добавлен товар ${id} в корзину`),
          }}
        >
          <MemoryRouter initialEntries={["/catalog/boots"]}>
            <div
              onClickCapture={(e) => {
                const target = e.target;

                if (target.tagName === "A" || target.closest("a")) {
                  e.preventDefault();
                  console.log("Навигация отключена");
                  return false;
                }
              }}
            >
              <Header />
            </div>
            <Routes>
              <Route path="/catalog/:category" element={<Story />} />
            </Routes>
            <div
              onClickCapture={(e) => {
                const target = e.target;

                if (target.tagName === "A" || target.closest("a")) {
                  e.preventDefault();
                  console.log("Навигация отключена");
                  return false;
                }
              }}
            >
              <Footer />
            </div>
          </MemoryRouter>
        </CartContext.Provider>
      );
    },
  ],
};

export const FoodNoFilters = {
  decorators: [
    (Story) => {
      const originalFetch = window.fetch;
      window.fetch = async (input) => {
        const url = typeof input === "string" ? input : input.url;
        if (url?.includes("/backend/start.php")) {
          return {
            ok: true,
            json: async () => mockFoodProducts,
          };
        }
        return originalFetch(input);
      };

      return (
        <CartContext.Provider
          value={{
            cart: { 1: {}, 2: {} },
            addToCart: (id) => console.log(`Добавлен товар ${id} в корзину`),
          }}
        >
          <MemoryRouter initialEntries={["/catalog/food"]}>
            <div
              onClickCapture={(e) => {
                const target = e.target;

                if (target.tagName === "A" || target.closest("a")) {
                  e.preventDefault();
                  console.log("Навигация отключена");
                  return false;
                }
              }}
            >
              <Header />
            </div>
            <Routes>
              <Route path="/catalog/:category" element={<Story />} />
            </Routes>
            <div
              onClickCapture={(e) => {
                const target = e.target;

                if (target.tagName === "A" || target.closest("a")) {
                  e.preventDefault();
                  console.log("Навигация отключена");
                  return false;
                }
              }}
            >
              <Footer />
            </div>
          </MemoryRouter>
        </CartContext.Provider>
      );
    },
  ],
};
