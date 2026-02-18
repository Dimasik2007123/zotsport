import AdminAdd from "../pages/AdminAdd";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Admin/AdminAdd",
  component: AdminAdd,
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
