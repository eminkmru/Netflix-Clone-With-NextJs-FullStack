import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prismasb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("You must be authenticated");
  }

  const currentUser = await prismasb.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    throw new Error("You must be authenticated");
  }

  return { currentUser };
};

export default serverAuth;
