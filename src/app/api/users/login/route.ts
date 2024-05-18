import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    if (!email || !password)
      throw new Error("Please provide the required credentials");

    //finding the user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }
    console.log("user exists");

    const validPassword = await bcryptjs.compare(password, user.password);

    //checking vwhther the password is valid
    if (!validPassword) {
      return NextResponse.json(
        { error: "check your credentials" },
        { status: 400 }
      );
    }

    //now creating the tokens

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in successfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,     //cookies can now only be manupted by server
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
}
}
