import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function createCookie(params:any[]) {
    cookies().set({
        name: params[0].name,
        value: params[0].value,
        httpOnly: true,
        path: '/',
      })
}

export const verifyJWT = async <T>(token: string): Promise<T> => {
    try {
      return (
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET)
        )
      ).payload as T;
    } catch (error) {
      console.log(error);
      throw new Error("Your token has expired.");
    }
  };

  type EnvVariableKey = "JWT_SECRET" | "JWT_EXPIRES_IN";

export function getEnvVariable(key: EnvVariableKey): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}


  export const signJWT = async (
    payload: { sub: string },
    options: { exp: string }
  ) => {
    try {
      const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET"));
      const alg = "HS256";
      return new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setExpirationTime(options.exp)
        .setIssuedAt()
        .setSubject(payload.sub)
        .sign(secret);
    } catch (error) {
      throw error;
    }
  };
  
  export function getErrorResponse(
    status: number = 500,
    message: string,
  ) {
    return new NextResponse(
      JSON.stringify({
        status: status < 500 ? "fail" : "error",
        message,
       // errors: errors ? errors.flatten() : null,
      }),
      {
        status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  