import AdminRed from "../pages/AdminRed";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Admin/AdminRed",
  component: AdminRed,
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
