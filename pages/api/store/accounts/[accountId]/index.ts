
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../../lib/prisma";
import { enableCors } from '../../../../../utils/cors';


export async function getStoreByAccountId(accountId: string) {
  console.log({ accountId })
  const page = await prisma.store.findFirst({ where: { accountId }, include: { products: true } });

  return page;
}

async function updateStore(accountId: string, data: any) {
  await prisma.store.update({ where: { accountId }, data });
}

async function deleteStore(accountId: string) {
  await prisma.store.delete({ where: { accountId } });
}

const Store = async (req: NextApiRequest, res: NextApiResponse) => {
  await enableCors(req, res)

  const {
    method
  } = req;

  if (method === "GET") {
    const { accountId } = req.query;
    try {
      const site = await getStoreByAccountId(accountId as string);
      console.log(site)
      return res.status(200).json({
        error: false,
        data: site,
      });
    } catch (error) {
      return res.status(404).json({
        error: true,
      });
    }
  }
  else if (method === "PATCH") {
    const { accountId } = req.query;

    const { name, theme, logo } = req.body;
    await updateStore(accountId as string, { name, theme, logo });

    return res.status(200).json({
      error: false,
      data: "ok",
    });
  }
  else if (method === "DELETE") {
    const { accountId } = req.query;
    await deleteStore(accountId as string);

    return res.status(200).json({
      error: false,
      data: "ok",
    });
  }
  else {
    return res
      .status(405)
      .json({ error: true, data: { message: "Method not allowed" } })

  }
}

export default Store;