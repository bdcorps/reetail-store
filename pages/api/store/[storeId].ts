
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'


export async function getStore(storeId: string) {
  const page = await prisma.store.findFirst({ include: { products: true } });

  return page;
}

const GetStore = async (req: NextApiRequest, res: NextApiResponse) => {
  const { storeId } = req.query;
  const site = await getStore(storeId as string);
  res.status(200).json({ site })
}

export default GetStore;