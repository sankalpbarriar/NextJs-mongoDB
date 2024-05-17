import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDatFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    //user ko jo hamne token diya hai usse id extract kar lenge usse databse ko request bhejenge aur data nikal lenge

    //1. Extract data from token
    const userId=await getDatFromToken(request);
    const user=await User.findOne({_id: userId}).select("-password")
    //check if there is no user
    if(!user){
        return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }
    return NextResponse.json({
        message:"user found",
        data:user
    })
}