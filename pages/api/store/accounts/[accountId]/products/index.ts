import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getStoreByAccountId } from '..';
import prisma from "../../../../../../lib/prisma";
import { enableCors } from '../../../../../../utils/cors';

const dummyPrices = [
  {
    id: "price_1LF4Y3C78xfjeYCUtob5fdAq",
    object: "price",
    active: true,
    billing_scheme: "per_unit",
    created: 1656284843,
    currency: "cad",
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: {
      id: "prod_LwyV2is7Lr9iGP",
      object: "product",
      active: true,
      attributes: [],
      created: 1656284843,
      default_price: "price_1LF4Y3C78xfjeYCUtob5fdAq",
      description: null,
      images: [],
      livemode: false,
      metadata: {},
      name: "Sukh's Shirt Updated",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: "txcd_10000000",
      type: "service",
      unit_label: null,
      updated: 1657757945,
      url: null
    },
    recurring: null,
    tax_behavior: "exclusive",
    tiers_mode: null,
    transform_quantity: null,
    type: "one_time",
    unit_amount: 1900,
    unit_amount_decimal: "1900"
  },
  {
    id: "price_1LF4AAC78xfjeYCUckmTFc1m",
    object: "price",
    active: true,
    billing_scheme: "per_unit",
    created: 1656283362,
    currency: "cad",
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: {
      id: "prod_Lwy6gD8Nomafd0",
      object: "product",
      active: true,
      attributes: [],
      created: 1656283361,
      default_price: "price_1LF4AAC78xfjeYCUckmTFc1m",
      description: null,
      images: [
        "https://files.stripe.com/links/MDB8YWNjdF8xSTRZOWZDNzh4ZmplWUNVfGZsX3Rlc3RfeUdXZDEyaE1zQzZ6YjRnVmRmUFo3djR400JFiN1jR7"
      ],
      livemode: false,
      metadata: {},
      name: "LargeMax Shirt Unisex",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: "txcd_10000000",
      type: "service",
      unit_label: null,
      updated: 1656283371,
      url: null
    },
    recurring: null,
    tax_behavior: "exclusive",
    tiers_mode: null,
    transform_quantity: null,
    type: "one_time",
    unit_amount: 3000,
    unit_amount_decimal: "3000"
  },
  {
    id: "price_1LF3sxC78xfjeYCUG34P8Eio",
    object: "price",
    active: true,
    billing_scheme: "per_unit",
    created: 1656282295,
    currency: "cad",
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: {
      id: "prod_LwxoeC4oYfgHFF",
      object: "product",
      active: true,
      attributes: [],
      created: 1656282294,
      default_price: "price_1LF3sxC78xfjeYCUG34P8Eio",
      description: null,
      images: [
        "https://files.stripe.com/links/MDB8YWNjdF8xSTRZOWZDNzh4ZmplWUNVfGZsX3Rlc3RfZFZiVE9CQkgyNE5FeTFHNHVNNXdPWkEz00gC2dtVVx"
      ],
      livemode: false,
      metadata: {},
      name: "Minimax Shirt Women's",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: "txcd_99999999",
      type: "service",
      unit_label: null,
      updated: 1656282295,
      url: null
    },
    recurring: null,
    tax_behavior: "exclusive",
    tiers_mode: null,
    transform_quantity: null,
    type: "one_time",
    unit_amount: 2500,
    unit_amount_decimal: "2500"
  },
  {
    id: "price_1Ij47lC78xfjeYCUkHWBaolv",
    object: "price",
    active: true,
    billing_scheme: "per_unit",
    created: 1619104045,
    currency: "cad",
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: {
      id: "prod_JLlfmP9JYTHqeU",
      object: "product",
      active: true,
      attributes: [],
      created: 1619104045,
      default_price: "price_1Ij47lC78xfjeYCUkHWBaolv",
      description: null,
      images: [
        "https://files.stripe.com/links/MDB8YWNjdF8xSTRZOWZDNzh4ZmplWUNVfGZsX3Rlc3RfREZaeUx6czVja0hKS0JjaEFHbnA4c1Bx00ebOCLsIP"
      ],
      livemode: false,
      metadata: {},
      name: "Minmax Men’s Shirt",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: "txcd_99999999",
      type: "service",
      unit_label: null,
      updated: 1656282027,
      url: null
    },
    recurring: null,
    tax_behavior: "unspecified",
    tiers_mode: null,
    transform_quantity: null,
    type: "one_time",
    unit_amount: 3000,
    unit_amount_decimal: "3000"
  }
]

const DEV_API_KEY = "sk_test_51I4Y9fC78xfjeYCUDWqjkBkktCkac65ppRHd2BGRhbH05CRe1MP8kalxJ36wslF7zvsJuNTFc7bVtuFs4uxDExct00ogA9EsWt"

const stripe = new Stripe(DEV_API_KEY, {
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
  const accountId = String(req.query.accountId);
  const store = await getStoreByAccountId(accountId as string);

  if (!store) {
    return res.status(404).json({
      error: true,
      message: "no store"
    });
  }

  // gets real data from Stripe. Commenting out because not all accounts can access their products data at this point. Stripe support will enable this after we go live.
  // const response = await stripe.prices.list({ expand: ['data.product'] },
  //   {
  //     stripeAccount: accountId
  //   }
  // );

  // const prices = response?.data;

  const prices = dummyPrices;



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