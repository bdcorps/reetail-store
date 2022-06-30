
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getStoreByAccountId } from '..';
import prisma from "../../../../../../lib/prisma";
import { enableCors } from '../../../../../../utils/cors';

const stripe = new Stripe('sk_test_...', {
  apiVersion: '2020-08-27',
});

async function createBatchProducts(storeId: number, data: any) {
  console.log("batch", storeId, data)
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

const CreateProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  await enableCors(req, res)
  const { accountId } = req.query;
  const store = await getStoreByAccountId(accountId as string);

  if (!store) {
    return res.status(404).json({
      error: true,
      message: "no store"
    });
  }


  const response = await stripe.prices.list({ expand: ['data.product'] },
    {
      apiKey: 'sk_test_51I4Y9fC78xfjeYCUDWqjkBkktCkac65ppRHd2BGRhbH05CRe1MP8kalxJ36wslF7zvsJuNTFc7bVtuFs4uxDExct00ogA9EsWt'
    }
  );

  const prices = response?.data;
  console.log(prices)
  const products = prices.map((rawStripeRes: any) => {
    const id = rawStripeRes.id;
    const price = rawStripeRes.unit_amount;
    const name = rawStripeRes.product.name; // TODO: might need work
    const image = rawStripeRes.product.images.length > 0 ? rawStripeRes.product.images[0] : "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80";

    return { id, name, price, rawStripeRes, storeId: store.id, image }
  })


  const productsObj = createBatchProducts(store.id, products);

  res.json({ data: productsObj })
}

export default CreateProducts;