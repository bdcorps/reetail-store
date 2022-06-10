
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";

async function getAccount(email: string) {
  const account = await prisma.account.findFirst({ where: { email }, include: { sites: true } });

  return account;
}

const GetAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;
  const account = await getAccount(email as string);
  res.status(200).json({ account })
}

export default GetAccount;