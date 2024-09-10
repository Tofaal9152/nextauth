import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { encode, decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export default async function Home() {
  const session = await auth();
  console.log(session);
  const cookes = cookies().get("authjs.session-token");
  console.log(
    await decode({
      token: cookes?.value!,
      salt: cookes?.name!,
      secret: process.env.AUTH_SECRET || "",
    })
  );

  return (
    <div>
      <Button>asd</Button>
      hello
    </div>
  );
}
