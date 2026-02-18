import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Pages/Home",
  component: Home,
  parameters: { layout: "fullscreen" },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = {};
