import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest){
    //clean cookies 
    try {
        const response=NextResponse.json({
            message:"Logout Successfully",
            success: true
        })
         
        //cleaning cookeis
        response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0)
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}