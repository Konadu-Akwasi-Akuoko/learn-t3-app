import {
  type AuthEndpoints,
  handleAuth,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { type NextRequest } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { kindeAuth: AuthEndpoints } },
) {
  const endpoint = params.kindeAuth;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return handleAuth(request, endpoint);
}
