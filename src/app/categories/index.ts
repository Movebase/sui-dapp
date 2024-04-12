import { ResourceProps } from "@refinedev/core";

export const categories: ResourceProps = {
  name: "categories",
  list: "/categories",
  create: "/categories/create",
  edit: "/categories/edit/:id",
  show: "/categories/show/:id",
};
