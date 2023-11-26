import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import CryptoJS from "crypto-js";


export async function middleware(request: NextRequest) {
  const currentUrl = request.nextUrl.href;
  const path = request.nextUrl.pathname;
  const base = request.nextUrl.origin;

  console.log(`Current Url: ${currentUrl}`, `Path: ${path}`, `Base: ${base}`);

  let token = "";
  let usr = null;

  //first request validation
  //console.log("gettting uid from url");
  const headers = new Headers(request.headers);

  //console.log("available headers in middleware: ", headers);

  if (request.nextUrl.searchParams.has("uid")) {
    const nextUrl = request.nextUrl;
    console.log("uid from url", request.nextUrl.searchParams.get("uid"));
    headers.set("uid", request.nextUrl.searchParams.get("uid")!);
    nextUrl.searchParams.delete("uid");
    //console.log('url afer delete', nextUrl.origin);
    //console.log(nextUrl.origin)
    return NextResponse.rewrite(nextUrl.origin, {
      headers: headers,
    });
  }

  if (
    currentUrl.includes("/statement") &&
    (!request.cookies.has("token") || !request.cookies.has("cob"))
  ) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (
    currentUrl.includes("/statement") &&
    request.cookies.has("token") &&
    request.cookies.has("cob")
  ) {
    {
      //decrypt token
      const cipheredToken = request.cookies.get("token")?.value;
      const bytes = CryptoJS.AES.decrypt(
        cipheredToken!,
        process.env.JWT_ENC_KI as string
      );
      token = bytes.toString(CryptoJS.enc.Utf8);
     
      const cipheredUsr = request.cookies.get("cob")?.value;
      const bytesUsr = CryptoJS.AES.decrypt(
        cipheredUsr!,
        process.env.JWT_ENC_KI as string
      );
     
      usr = bytesUsr.toString(CryptoJS.enc.Utf8);

      headers.set("usr", usr);
      return NextResponse.next({
        request: {
          headers: headers,
        },
      });
    }
  }
}


const config = {
  matcher: ["/","/statement/:path*"],
}
