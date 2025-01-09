import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export type Payload = {
  sub: string;
  role: string;
};

export function middleware(request: NextRequest) {
  // Check if the user is accessing a protected route
  const token = request.cookies.get("refreshToken");
  const url = request.nextUrl.pathname;
  // Public Routes
  const publicRoutes = ["/", "/login", "/register"];
  const adminRoutes = ["/manage"];
  const restrictedRoutes = ["/login", '/register'];
  
  if(token && restrictedRoutes.includes(url)) {
    return NextResponse.redirect(new URL("/", request.url));

  }
  // Check if the user is accessing a public route
  if (publicRoutes.includes(url)) {
    return NextResponse.next();
  }

  // If no token is provided, redirect to login for protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Decode the JWT to extract user role
    const decodedToken: Payload = jwtDecode(token.value);
    // Role-based route access
    if (decodedToken.role === "ADMIN") {
      return NextResponse.next();
    }

    if (decodedToken.role === "USER") {
      if (adminRoutes.includes(url)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next(); 
    }

    // For invalid roles, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(new URL("/login", request.url)); 
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico).*)",
  ],
};
