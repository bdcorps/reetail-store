
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../../../../lib/prisma";
import { enableCors } from '../../../../../utils/cors';
import { getProductsFromStripe } from './products';


export async function getStoreByAccountId(accountId: string) {
  const page = await prisma.store.findFirst({ where: { accountId }, include: { products: true } });

  return page;
}

// todo: get actual data from stripe and compare it. Mocking it for now.
async function getShouldRefreshProducts(accountId: string, storeId: number, currentProducts: any) {
  const productsOnStripe = await getProductsFromStripe(accountId, storeId);
  const productsFromStore = currentProducts;

  return true;
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
    const accountId = String(req.query.accountId);
    // try {
    const site: any = await getStoreByAccountId(accountId);

    // if (!site) {
    //   throw new Error("no site found")
    // }

    if (site) {
      const shouldRefreshProducts: boolean = await getShouldRefreshProducts(accountId, site?.id, site?.products)
      site["refreshProducts"] = shouldRefreshProducts;
    }

    return res.status(200).json({
      error: false,
      data: site,
    });
    // } catch (error) {
    //   return res.status(404).json({
    //     error: true,
    //   });
    // }
  }
  else if (method === "PATCH") {
    const accountId = String(req.query.accountId);
    const { name, theme, logo } = req.body;
    await updateStore(accountId, { name, theme, logo });

    return res.status(200).json({
      error: false,
      data: "ok",
    });
  }
  else if (method === "DELETE") {
    const accountId = String(req.query.accountId);
    await deleteStore(accountId);

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