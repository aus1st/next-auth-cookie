import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

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

        const response = NextResponse.json({
            message: 'success',
            success: true,
            user: usr
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 900
        });

        return response;


    }



}