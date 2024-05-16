"use client";
import { AuthPage } from "@components/auth-page";
import { useGo, useIsAuthenticated } from "@refinedev/core";

export default function Login() {
  const { data, isFetching } = useIsAuthenticated();
  const go = useGo();
  // if (isFetching) {
  //   return;
  // } else if (data?.authenticated) {
  //   go({ to: "/dapps" });
  // } else {
  return <AuthPage type="login" />;
  // }
}
