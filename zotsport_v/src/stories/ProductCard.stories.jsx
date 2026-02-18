import ProductCard from "../components/ProductCard";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: { layout: "centered" },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const mockProduct = {
  id: 1,
  name: "Test Product",
  image: "https://via.placeholder.com/150",
  price: 100,
  old_price: 150,
  sale: 33,
};

export const Default = {
  args: {
    product: mockProduct,
    onAdd: (id) => alert(`Added ${id}`),
  },
};
