import * as cryptoJs from "crypto-js";

export const decrypt = (encryptedText: string, password: string) => {
  try {
    return cryptoJs.AES.decrypt(encryptedText, password).toString(
      cryptoJs.enc.Utf8
    );
  } catch {
    return null;
  }
};
