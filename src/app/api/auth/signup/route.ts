import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import database from '@/DataBase/database';
import { User } from '@/model/userModel';


export async function POST(req:NextRequest) {
    try {
        const {name , email,password} = await req.json()
        if (!name|| !email || !password) {
            return NextResponse.json({success: false,message:"All fields are required"},{status:404})
        }
        await database();
        let user = await User.findOne({email})
        if (user) {
            return NextResponse.json({success: false,message:"User already exist"},{status:404}) 
        }
        const hashPassword = await bcrypt.hash(password,10)
        await User.create({
            name,
            email,
            password:hashPassword
        })
        return NextResponse.json({success: true,message: "User created successfully"}, {status: 201}); 
    } catch (error) {
        return NextResponse.json({success: false,message:"Internal Server Error"},{status:500})
    }
   
}
