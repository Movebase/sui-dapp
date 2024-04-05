import { ResourceProps } from "@refinedev/core";

export const dapps: ResourceProps = {
  name: "dapps",
  list: "/dapps",
  create: "/dapps/create",
  edit: "/dapps/edit/:id",
  show: "/dapps/show/:id",
  meta: {
    canDelete: true,
  },
};
