import { AccessControlProvider, CanParams } from "@refinedev/core";
import { CanResponse } from "@refinedev/core/dist/interfaces/bindings/access-control";
import { authProvider } from "../auth-provider";
import { UserRole } from "../../enum";

const accessControlProvider: AccessControlProvider = {
  can: async ({
    resource,
    action,
    params,
  }: CanParams): Promise<CanResponse> => {
    const role = await authProvider.getPermissions?.();

    if (role !== UserRole.ADMIN && resource !== "dapps") {
      return {
        can: false,
        reason: "Unauthorized",
      };
    }
    return { can: true };
  },
  // options: {
  //   buttons: {
  //     enableAccessControl: true,
  //     hideIfUnauthorized: false,
  //   },
  //   // queryOptions: {
  //   //   // ... default global query options
  //   //   retry: 3
  //   // },
  // },
};
export default accessControlProvider;
