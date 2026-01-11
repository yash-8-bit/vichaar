import prisma from "./lib/prisma";

export  default async function Home() {
  const user = await prisma.user.findMany();
  return (
    <h1>hello i am yash</h1>
  );
}
