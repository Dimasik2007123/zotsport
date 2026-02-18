import AdminDel from "../pages/AdminDel";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Admin/AdminDel",
  component: AdminDel,
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
