import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "../../provider";

export const Register = () => {
  return (
    <AuthPage type="register" formProps={{ initialValues: authCredentials }} />
  );
};
