import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";
import { getEnvVariable, signJWT } from "@/lib";
import {serialize} from 'cookie'

export const POST = async (request: NextRequest) => {
  const body = await request.json().catch(() => null);

  if (body.email === "admin" && body.password === "admin") {
    console.log('body inside api: ',body)
    // const secret = new TextEncoder().encode(
    //     process.env.JWT_SECRET
    //   );
  
    //   console.log("secret: ", secret);
      //const alg = "HS256";
  
      const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

      const token = await signJWT(
        { sub: body.email},
        { exp: `${JWT_EXPIRES_IN}m` }
      );
  
        console.log(token)

      const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;

   
        const cookieOptions = {
          name: "token",
          value: token,
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          maxAge: tokenMaxAge,
        };


        const searialized = serialize("token", token, cookieOptions)
  
        
        const response = new NextResponse(JSON.stringify({status: "success",token,}),
            {
              status: 200,
              headers: { 'Set-Cookie': searialized },
            }
          );
      
          // await Promise.all([
          //   response.cookies.set(cookieOptions),
          //   response.cookies.set({
          //     name: "logged-in",
          //     value: "true",
          //     maxAge: tokenMaxAge,
          //   }),
          // ]);
          console.log(response.cookies)
          return response;
  }

  return NextResponse.json({ message: "Hello World!" });
};