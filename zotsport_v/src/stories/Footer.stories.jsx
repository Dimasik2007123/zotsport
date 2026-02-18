import { MemoryRouter } from "react-router-dom";
import Footer from "../components/Footer";

export default {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        {" "}
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
