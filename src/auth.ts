import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "./model/userModel";
import bcryptjs from "bcryptjs";
import database from "./DataBase/database";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin({
            cause: "All fields are required",
          });
        }
        await database();
        const user = await User.findOne({
          email,
        }).select("+password");

        if (!user) {
          throw new CredentialsSignin({
            cause: "Invalid Email or Password",
          });
        }

        if (!user.password) {
          throw new CredentialsSignin({
            cause: "Invalid Email or Password",
          });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
          throw new CredentialsSignin({
            cause: "Invalid Email or Password",
          });
        }

        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // signOut: "/",
    // error: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { name, email, image, id } = user;
          await database();
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            await User.create({
              name,
              email,
              image,
              googleId: id,
            });
          }
          return true;
        } catch (error) {
          throw new AuthError("Failed to create user");
        }
      }
      return true;
    },
  },
});
