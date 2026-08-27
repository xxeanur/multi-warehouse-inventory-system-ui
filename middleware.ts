import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getRoleFromToken(token: string | undefined) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    const parsed = JSON.parse(jsonPayload);
    return (
      parsed.role ||
      parsed["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    );
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const path = request.nextUrl.pathname;

  const isPublicPath = [
    "/login",
    "/forgot-password",
    "/support",
    "/reset-password",
    "/confirm-email",
  ].includes(path);
  const isAuthPage = ["/login", "/forgot-password", "/reset-password"].includes(
    path,
  );

  const isAuthenticated = !!accessToken || !!refreshToken;

  // Rolü belirle ve yönlendirilecek varsayılan sayfayı seç
  const role = getRoleFromToken(accessToken);
  const defaultPath = role === "Staff" ? "/products" : "/dashboard";

  if (path === "/") {
    return NextResponse.redirect(
      new URL(isAuthenticated ? defaultPath : "/login", request.url),
    );
  }

  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL(defaultPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
