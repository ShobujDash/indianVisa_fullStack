import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
  console.log("middleware executed")
  // return NextResponse.redirect(new URL("himvai/authentication",request.url));
}

export const config = {
  matcher: "/himvai/authentication",
};