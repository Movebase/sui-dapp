"use client";

import { useForm } from "@refinedev/react-hook-form";
import { FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";
import {
  BaseRecord,
  HttpError,
  LoginFormTypes,
  LoginPageProps,
  useActiveAuthProvider,
  useLink,
  useLogin,
  useRouterContext,
  useRouterType,
  useTranslate,
} from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/mui";
import { FormPropsType } from "@refinedev/mui/dist/components/pages/auth";
import { CSSProperties, useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { generateNonce, generateRandomness } from "@mysten/zklogin";
import GoogleLogo from "../../app/asset/google.svg";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { useSearchParams } from "next/navigation";

export const layoutStyles: CSSProperties = {};

export const titleStyles: CSSProperties = {
  textAlign: "center",
  fontSize: "24px",
  marginBottom: "24px",
  overflowWrap: "break-word",
  hyphens: "manual",
  textOverflow: "unset",
  whiteSpace: "pre-wrap",
};

type LoginProps = LoginPageProps<BoxProps, CardContentProps, FormPropsType>;

/**
 * login will be used as the default type of the <AuthPage> component. The login page will be used to log in to the system.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({
    ...useFormProps,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const params = useSearchParams();
  const redirectPath = params?.get("to") ?? "";

  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const [showPassword, setShowPassword] = useState(false);
  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;
  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? (
          <ThemedTitleV2
            collapsed={false}
            wrapperStyles={{
              gap: "8px",
            }}
          />
        )}
      </div>
    );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <Stack spacing={1}>
            {providers.map((provider: any) => {
              return (
                <Button
                  key={provider.name}
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: "primary.light",
                    borderColor: "primary.light",
                    textTransform: "none",
                  }}
                  //   onClick={() => login({ providerName: provider.name })}
                  startIcon={provider.icon}
                >
                  {provider.label}
                </Button>
              );
            })}
          </Stack>
          {!hideForm && (
            <Divider
              sx={{
                fontSize: "12px",
                marginY: "16px",
              }}
            >
              {translate("pages.login.divider", "or")}
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={titleStyles}
          color="primary"
          fontWeight={700}
        >
          {translate("pages.login.title", "Sign in to your account")}
        </Typography>
        {renderProviders()}
        {!hideForm && (
          <Box
            component="form"
            onSubmit={handleSubmit((data: any) => {
              if (onSubmit) {
                return onSubmit(data);
              }
              // muatateLogin(data);
              login({ ...data, redirectPath: redirectPath });
            })}
          >
            <TextField
              {...register("email", {
                required: true,
              })}
              id="email"
              margin="normal"
              fullWidth
              label={translate("pages.login.fields.email", "Email")}
              error={!!errors.email}
              name="email"
              type="email"
              autoComplete="email"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                mt: 0,
              }}
            />
            <TextField
              {...register("password", {
                required: true,
              })}
              id="password"
              margin="normal"
              fullWidth
              name="password"
              label={translate("pages.login.fields.password", "Password")}
              helperText={errors?.password?.message}
              error={!!errors.password}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={translate(
                        showPassword
                          ? "ra.input.password.toggle_visible"
                          : "ra.input.password.toggle_hidden",
                      )}
                      onClick={handleClick}
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 0,
              }}
            />
            <Box
              component="div"
              sx={{
                mt: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {rememberMe ?? (
                <FormControlLabel
                  sx={{
                    span: {
                      fontSize: "14px",
                      color: "text.secondary",
                    },
                  }}
                  color="secondary"
                  control={
                    <Checkbox
                      size="small"
                      id="remember"
                      {...register("remember")}
                    />
                  }
                  label={translate(
                    "pages.login.buttons.rememberMe",
                    "Remember me",
                  )}
                />
              )}
              {forgotPasswordLink ?? (
                <MuiLink
                  variant="body2"
                  color="primary"
                  fontSize="12px"
                  component={ActiveLink}
                  underline="none"
                  to="/forgot-password"
                >
                  {translate(
                    "pages.login.buttons.forgotPassword",
                    "Forgot password?",
                  )}
                </MuiLink>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              //   disabled={isLoading}
              sx={{ mt: "24px" }}
            >
              {translate("pages.login.signin", "Sign in")}
            </Button>
            <ZkProviderButtons />
          </Box>
        )}
      </CardContent>
    </Card>
  );
  //   useEffect(() => {
  //     if (isSuccess) {
  //       console.log(data);
  //       dispatch(setCredentials({ user: data.user, token: data.token }));
  //       go({ to: "/" });
  //     }
  //   }, [isSuccess]);
  return (
    <FormProvider {...methods}>
      <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
        <Container
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: hideForm ? "flex-start" : "center",
            alignItems: "center",
            minHeight: "100dvh",
            padding: "16px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
              display: "flex",
              flexDirection: "column",
              paddingTop: hideForm ? "15dvh" : 0,
            }}
          >
            {renderContent ? (
              renderContent(Content, PageTitle)
            ) : (
              <>
                {/* {PageTitle} */}
                {Content}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </FormProvider>
  );
};
type Network = "testnet" | "mainnet";

const SUI_NETWORK: Network =
  (process.env.NEXT_PUBLIC_SUI_NETWORK as Network) || "testnet";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "";
export const suiClient = new SuiClient({ url: getFullnodeUrl(SUI_NETWORK) });
export const ZkProviderButtons = () => {
  return (
    <>
      <Divider>ZkLogin</Divider>
      <Button
        sx={{ mt: "24px", width: "100%" }}
        variant="text"
        onClick={async () => {
          const ephemeralKeyPair = Ed25519Keypair.generate();
          const randomness = generateRandomness();
          const { epoch } = await suiClient.getLatestSuiSystemState();
          const maxEpoch = Number(epoch) + 10;

          const nonce = generateNonce(
            ephemeralKeyPair.getPublicKey(),
            maxEpoch,
            randomness,
          );

          const params = new URLSearchParams({
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: "id_token",
            scope: ["openid", "email"].join(" "),
            nonce,
          });

          const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
          window.location.replace(loginURL);
        }}
      >
        <img
          src={GoogleLogo.src}
          width="16px"
          style={{ marginRight: "8px" }}
          alt="Google"
        />{" "}
        Sign In With Google
      </Button>
    </>
  );
};
