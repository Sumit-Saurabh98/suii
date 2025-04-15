import { auth } from "./auth";

export default auth((req) => {
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isAuthUser = !!req.auth;

  if (isLoginPage) {
    if (isAuthUser) {
      return Response.redirect(new URL("/", req.url));
    }

    return undefined;
  }

  if (!isAuthUser) {
    return Response.redirect(new URL("/login", req.url));
  }

  return undefined;
});

export const config = {
  matcher: ["/", "/editor/:path*", "/login"],
};