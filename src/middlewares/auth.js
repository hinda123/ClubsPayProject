import { authorizeAccount } from "../security/securityConfig";

export function authorize(req, res, next) {
  const accessToken = req.header("Authorization");
  authorizeAccount(accessToken, next, this);
}
