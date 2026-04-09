import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Routes publiques (pas besoin d'être connecté)
  const publicRoutes = ["/", "/login"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Si l'utilisateur est connecté et est sur la page login, on le redirige vers le dashboard
  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};