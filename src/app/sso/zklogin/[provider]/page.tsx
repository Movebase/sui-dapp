"use client";

import { Button, Divider } from "@mui/material";
// import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
// import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
// import { generateNonce, generateRandomness } from "@mysten/zklogin";
import { useGo } from "@refinedev/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import queryString from "query-string";
import { StorageKey } from "../../../../enum";
import API from "../../../../providers/api";

const ZkLogin = () => {
  const { provider } = useParams();
  const go = useGo();
  const oauthParams: any =
    typeof window !== "undefined" && queryString.parse(window.location.hash);

  useQuery({
    queryKey: ["zkLogin", oauthParams?.id_token],
    queryFn: () => {
      if (!oauthParams?.id_token || typeof oauthParams.id_token !== "string") {
        go({ to: "/login" });
      }

      return API.post("/auth/sso/google", {
        accessToken: oauthParams.id_token,
      });
    },
    select: async (res) => {
      const data = await res.data;
      const { token, salt, refreshToken } = data;
      localStorage.setItem(StorageKey.USER_SALT, salt);
      localStorage.setItem(StorageKey.TOKEN, token);
      localStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
      go({ to: "/dapps" });
    },
    // onError: (error: any) => notify(error, { type: "error" }),
  });

  return <></>;
};

export default ZkLogin;
