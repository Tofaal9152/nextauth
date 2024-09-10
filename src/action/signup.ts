"use server";

import database from "@/DataBase/database";
import { User } from "@/model/userModel";
import { CredentialsSignin } from "next-auth";
import bcrypt from "bcryptjs"; 
export const credentialsSignup = async (name:string,email: string, password: string) => {
  try {
    await database();

    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
    const hashPaswword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashPaswword,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};
