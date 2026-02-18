import AdminChoice from "../pages/AdminChoice";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Admin/AdminChoice",
  component: AdminChoice,
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
