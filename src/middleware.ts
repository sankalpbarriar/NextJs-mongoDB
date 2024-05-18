import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; //extracting actual path

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  //agar uske paas token hai to use public path use karne mat do
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

 
}

export const config = {
  matcher: ["/", "/login", "/signup", "/verifyemail", "/profile"], //in in route pe mai jaunga usse pehle ye middleware chal do
};