import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import { url } from "inspector";

export async function POST(request: NextRequest) {
    const { uid } = await request.json()
    // node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    

    if (uid) {
        const usr = {
            AD_USRID: 'siddiqui.ahmed',
            AD_USRDEPT: 'IT',
            AD_USRNAME: 'Ahmed Siddiqui',
            API_TOKEN: '123456789',
        }
        const token = jwt.sign(
            usr,
            process.env.JWT_SECRET as string,
            
            { expiresIn: '2m' }
        )

       const cipheredObj = CryptoJS.AES.encrypt(JSON.stringify(usr), process.env.JWT_ENC_KI as string).toString();     
       const cipheredToken = CryptoJS.AES.encrypt(JSON.stringify(token), process.env.JWT_ENC_KI as string).toString();     

        const response = NextResponse.json({
            message: 'success',
            success: true,
            //user: usr
        });
        //1 second = 1000 milliseconds
        //maxage = 1800 = 30 minutes
        //seconds * minuts * hours * days * months  
        const tokenMaxAge = 60 * 2;
        const cookieOptions = {
            name: 'loginT',
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV !== 'development',
            maxAge: tokenMaxAge
        }
        response.cookies.set('cob', cipheredObj, {
            httpOnly: true,
            maxAge:tokenMaxAge,
            
        })
        response.cookies.set('token', cipheredToken, {
            httpOnly: true,
            maxAge: tokenMaxAge,
            path:'/'
           
        });
        //console.log(response)
        return response;


    }



}


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    // node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    

    if (uid) {
        const usr = {
            AD_USRID: 'siddiqui.ahmed',
            AD_USRDEPT: 'IT',
            AD_USRNAME: 'Ahmed Siddiqui',
            API_TOKEN: '123456789',
        }
        const token = jwt.sign(
            usr,
            process.env.JWT_SECRET as string,
            { expiresIn: '2m' }
        )

       const cipheredObj = CryptoJS.AES.encrypt(JSON.stringify(usr), process.env.JWT_ENC_KI as string).toString();     

        const response = NextResponse.json({
            message: 'success',
            success: true,
            //user: usr
        });
        //1 second = 1000 milliseconds
        //maxage = 1800 = 30 minutes
        //minutes * 60 seconds * 1000 = milliseconds
        response.cookies.set('cipheredObj', cipheredObj, {
            httpOnly: true,
            maxAge:1800,
            
        })
        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 1800,
           
        });
        console.log(response)
        return response;


    }



}