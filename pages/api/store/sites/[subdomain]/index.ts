
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../../lib/prisma";
import { enableCors } from '../../../../../utils/cors';

export async function getStoreBySubdomain(subdomain: string) {
  const page = await prisma.store.findFirst({ where: { subdomain }, include: { products: true } });

  return page;
}

const Store = async (req: NextApiRequest, res: NextApiResponse) => {
  await enableCors(req, res)

  const {
    method
  } = req;

  if (method === "GET") {
    const { subdomain } = req.query;
    try {
      const site = await getStoreBySubdomain(subdomain as string);
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
  else {
    return res
      .status(405)
      .json({ error: true, data: { message: "Method not allowed" } })

  }
}

export default Store;