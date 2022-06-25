
import type { NextApiRequest, NextApiResponse } from 'next'
import stripe from 'stripe';
import prisma from "../../../lib/prisma";

async function createBatchProducts(storeId: number, data: any) {

  await prisma.product.deleteMany({
    where: {
      storeId
    },
  })

  const products = await prisma.product.createMany({
    data
  })


  return products;
}

const GetAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const { storeId = 1, apiKey } = req.body;

  const response = await stripe.prices.list({ expand: ['data.product'] },
    {
      apiKey: 'sk_test_51I4Y9fC78xfjeYCUDWqjkBkktCkac65ppRHd2BGRhbH05CRe1MP8kalxJ36wslF7zvsJuNTFc7bVtuFs4uxDExct00ogA9EsWt'
    }
  );

  const prices = response?.data;
  console.log(prices)
  const products = prices.map((rawStripeRes: any) => {
    const price = rawStripeRes.unit_amount;
    const name = rawStripeRes.product.name; // TODO: might need work

    return { name, price, rawStripeRes, storeId }
  })


  const productsObj = createBatchProducts(storeId, products);


  res.json({ data: productsObj })
}

export default GetAccount;