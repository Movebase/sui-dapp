import { AuthPage } from "@components/auth-page";
import { redirect } from "next/navigation";

export default async function ForgotPassword() {
  return <AuthPage type="forgotPassword" />;
}
