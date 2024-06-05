import { ResourceProps } from "@refinedev/core";
export const users: ResourceProps = {
  name: "users",
  list: "/users",
  create: "/users/create",
  edit: "/users/edit/:id",
  show: "/users/show/:id",
  meta: {
    canDelete: true,
  },
};
