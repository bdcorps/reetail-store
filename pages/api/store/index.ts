
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../lib/prisma";
import { enableCors } from '../../../utils/cors';
import { createBatchProducts, getProductsFromStripe } from './accounts/[accountId]/products';

const Store = async (req: NextApiRequest, res: NextApiResponse) => {
  await enableCors(req, res)
  const {
    method
  } = req;
  if (method === "POST") {
    const { accountId, name, subdomain } = req.body;

    try {
      const store = await prisma.store.create({
        data: {
          accountId, name, subdomain
        },
      });

      const products = await getProductsFromStripe(accountId, store.id);
      const productsObj = createBatchProducts(store.id, products);


      return res.status(200).json({ done: "ok" });
    } catch (error) {
      return res.status(500).json({ error: true, data: { message: "Method not allowed" } })
    }
  }
  else {
    return res
      .status(405)
      .json({ error: true, data: { message: "Method not allowed" } })

  }
}

export default Store;